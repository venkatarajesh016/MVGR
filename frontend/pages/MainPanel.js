import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import io from 'socket.io-client';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';
import { searchRooms, getRoute, getTodaySchedule, getTriggers } from '../services/api';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const destIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-violet.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

function MapUpdater({ center, zoom }) {
    const map = useMap();
    useEffect(() => {
        if (center) map.setView(center, zoom || 17);
    }, [center, zoom, map]);
    return null;
}

function MainPanel({ isGuest = false }) {
    const { user, mapCenter, mapZoom, setMapCenter, routeInfo, setRouteInfo, triggers, setTriggers, addTrigger, todaySchedule, setTodaySchedule } = useStore();

    const [fromInput, setFromInput] = useState('');
    const [toInput, setToInput] = useState('');
    const [searchResultsFrom, setSearchResultsFrom] = useState([]);
    const [searchResultsTo, setSearchResultsTo] = useState([]);
    const [showFromResults, setShowFromResults] = useState(false);
    const [showToResults, setShowToResults] = useState(false);
    const [selectedFrom, setSelectedFrom] = useState(null);
    const [selectedTo, setSelectedTo] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [routePath, setRoutePath] = useState([]);

    // Track locally dismissed alerts so they stop showing for this session
    const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

    const dismissAlert = (e, triggerId) => {
        e.stopPropagation();
        setDismissedAlerts(prev => {
            const newSet = new Set(prev);
            newSet.add(triggerId);
            return newSet;
        });
    };

    const campusId = user?.campusId || 'MVGR';
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    // GPS location
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const loc = [pos.coords.latitude, pos.coords.longitude];
                    setUserLocation(loc);
                    if (isGuest) setMapCenter(loc);
                },
                () => console.log('GPS denied')
            );
        }
    }, [isGuest, setMapCenter]);

    // Socket.io for triggers
    useEffect(() => {
        const socket = io(API_URL);
        socket.emit('join-campus', campusId);
        if (user?.id) socket.emit('join-student', user.id);

        socket.on('new-trigger', (trigger) => {
            addTrigger(trigger);
            toast('⚠️ ' + trigger.title, { icon: '🔔', duration: 6000 });
        });

        return () => socket.disconnect();
    }, [campusId, user, API_URL, addTrigger]);

    // Load today's schedule
    useEffect(() => {
        if (!isGuest && user) {
            getTodaySchedule().then(res => setTodaySchedule(res.data.entries || [])).catch(() => { });
            getTriggers(campusId).then(res => setTriggers(res.data || [])).catch(() => { });
        }
    }, [user, isGuest, campusId, setTodaySchedule, setTriggers]);

    // Search handler
    const handleSearch = useCallback(async (query, type) => {
        if (query.length < 2) {
            type === 'from' ? setSearchResultsFrom([]) : setSearchResultsTo([]);
            return;
        }
        try {
            const res = await searchRooms(query, campusId);
            type === 'from' ? setSearchResultsFrom(res.data) : setSearchResultsTo(res.data);
        } catch { }
    }, [campusId]);

    const selectRoom = (room, type) => {
        if (type === 'from') {
            setSelectedFrom(room);
            setFromInput(room.roomCode + ' - ' + (room.roomLabel || room.buildingName));
            setShowFromResults(false);
        } else {
            setSelectedTo(room);
            setToInput(room.roomCode + ' - ' + (room.roomLabel || room.buildingName));
            setShowToResults(false);
        }
    };

    const handleNavigate = async () => {
        if (!toInput) return toast.error('Please enter a destination');
        try {
            const res = await getRoute(campusId, selectedFrom?.roomCode || '', selectedTo?.roomCode || toInput);
            setRouteInfo(res.data);

            // Set map view
            if (res.data.coordinates) {
                setMapCenter([res.data.coordinates.lat, res.data.coordinates.lng]);
            }

            // Draw route line
            const points = [];
            if (userLocation) points.push(userLocation);
            if (selectedFrom?.lat) points.push([selectedFrom.lat, selectedFrom.lng]);
            if (res.data.coordinates) points.push([res.data.coordinates.lat, res.data.coordinates.lng]);
            setRoutePath(points);

            toast.success('Route found!');
        } catch (err) {
            toast.error(err.response?.data?.error || 'Route not found');
        }
    };

    const navigateToScheduleItem = async (entry) => {
        setToInput(entry.roomCode);
        try {
            const res = await getRoute(campusId, '', entry.roomCode);
            setRouteInfo(res.data);
            if (res.data.coordinates) setMapCenter([res.data.coordinates.lat, res.data.coordinates.lng]);
        } catch { }
    };

    return (
        <div className="main-panel">
            <div className="main-content">
                {/* Trigger Banners */}
                {triggers.filter(t => t.isActive && !dismissedAlerts.has(t._id)).slice(0, 3).map(t => (
                    <div className="trigger-banner" key={t._id} style={{ position: 'relative' }}>
                        <span className="trigger-banner-icon">⚠️</span>
                        <div className="trigger-banner-text" style={{ paddingRight: '20px' }}>
                            <strong>{t.title}</strong> — {t.message}
                            {t.fromRoom && <> | <span className="trigger-banner-from">{t.fromRoom}</span> → <span className="trigger-banner-to">{t.toRoom}</span></>}
                        </div>
                        <button
                            onClick={(e) => dismissAlert(e, t._id)}
                            style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#64748b' }}>
                            &times;
                        </button>
                    </div>
                ))}

                {/* Query Bar */}
                <div className="query-bar">
                    <div className="query-field" style={{ position: 'relative' }}>
                        <label>📍 I am at</label>
                        <input
                            className="input"
                            placeholder={userLocation ? 'GPS detected — or type a room' : 'Type room code / name'}
                            value={fromInput}
                            onChange={(e) => { setFromInput(e.target.value); handleSearch(e.target.value, 'from'); setShowFromResults(true); }}
                            onFocus={() => setShowFromResults(true)}
                            onBlur={() => setTimeout(() => setShowFromResults(false), 200)}
                        />
                        {showFromResults && searchResultsFrom.length > 0 && (
                            <div className="search-results">
                                {searchResultsFrom.map(r => (
                                    <div className="search-item" key={r._id} onMouseDown={() => selectRoom(r, 'from')}>
                                        <div className="search-item-code">{r.roomCode} — {r.roomLabel}</div>
                                        <div className="search-item-details">{r.buildingName} · Floor {r.floor} · {r.department}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="query-field" style={{ position: 'relative' }}>
                        <label>🏁 I want to reach</label>
                        <input
                            className="input"
                            placeholder="Room / Lab / Department / Building"
                            value={toInput}
                            onChange={(e) => { setToInput(e.target.value); handleSearch(e.target.value, 'to'); setShowToResults(true); }}
                            onFocus={() => setShowToResults(true)}
                            onBlur={() => setTimeout(() => setShowToResults(false), 200)}
                        />
                        {showToResults && searchResultsTo.length > 0 && (
                            <div className="search-results">
                                {searchResultsTo.map(r => (
                                    <div className="search-item" key={r._id} onMouseDown={() => selectRoom(r, 'to')}>
                                        <div className="search-item-code">{r.roomCode} — {r.roomLabel}</div>
                                        <div className="search-item-details">{r.buildingName} · Floor {r.floor} · {r.department}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button className="btn btn-primary" onClick={handleNavigate} style={{ minWidth: '120px', height: '44px' }}>
                        Navigate →
                    </button>
                </div>

                {/* Map */}
                <div className="map-container">
                    <MapContainer center={mapCenter} zoom={mapZoom} style={{ height: '100%', width: '100%' }}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <MapUpdater center={mapCenter} zoom={mapZoom} />

                        {userLocation && (
                            <Marker position={userLocation}>
                                <Popup>📍 You are here</Popup>
                            </Marker>
                        )}

                        {routeInfo?.coordinates && (
                            <Marker position={[routeInfo.coordinates.lat, routeInfo.coordinates.lng]} icon={destIcon}>
                                <Popup>
                                    🏁 {routeInfo.destination?.roomLabel || routeInfo.destination?.roomCode}<br />
                                    {routeInfo.destination?.buildingName} · Floor {routeInfo.destination?.floor}
                                </Popup>
                            </Marker>
                        )}

                        {routePath.length >= 2 && (
                            <Polyline positions={routePath} color="#8b5cf6" weight={4} dashArray="10,10" />
                        )}
                    </MapContainer>

                    {/* Indoor Route Instructions */}
                    {routeInfo?.instructions && (
                        <div className="route-panel">
                            <h4 style={{ fontSize: '0.9rem', marginBottom: '12px', color: '#8b5cf6' }}>
                                🚶 Route to {routeInfo.destination?.roomLabel || routeInfo.destination?.roomCode}
                            </h4>
                            {routeInfo.instructions.map((step, i) => (
                                <div className="route-step" key={i}>
                                    <span className="route-step-num">{i + 1}</span>
                                    <span>{step}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Hotspot Sidebar (Student only) */}
            {!isGuest && (
                <div className="hotspot-sidebar">
                    <div className="hotspot-title">📍 Today's Schedule</div>
                    {todaySchedule.length === 0 ? (
                        <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                            No classes today, or upload your timetable to see your daily schedule here.
                        </p>
                    ) : (
                        todaySchedule.map((entry, i) => (
                            <div className="hotspot-item" key={i} onClick={() => navigateToScheduleItem(entry)}>
                                <div className="hotspot-time">{entry.startTime} - {entry.endTime}</div>
                                <div className="hotspot-subject">{entry.subject}</div>
                                <div className="hotspot-room">{entry.roomCode} · Floor {entry.floor}</div>
                            </div>
                        ))
                    )}

                    {triggers.filter(t => t.isActive && !dismissedAlerts.has(t._id)).length > 0 && (
                        <>
                            <div className="hotspot-title" style={{ marginTop: '24px', color: '#f59e0b' }}>⚠️ Active Alerts</div>
                            {triggers.filter(t => t.isActive && !dismissedAlerts.has(t._id)).map(t => (
                                <div className="hotspot-item" key={t._id} style={{ borderColor: 'rgba(245,158,11,0.3)', position: 'relative' }}>
                                    <div className="hotspot-time" style={{ color: '#f59e0b' }}>{t.triggerType}</div>
                                    <div className="hotspot-subject">{t.title}</div>
                                    <div className="hotspot-room">{t.fromRoom} → {t.toRoom}</div>
                                    <button
                                        onClick={(e) => dismissAlert(e, t._id)}
                                        style={{ position: 'absolute', right: '10px', top: '10px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.2rem', color: '#94a3b8' }}>
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default MainPanel;
