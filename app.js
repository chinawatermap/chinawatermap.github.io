// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if Leaflet is loaded and map element exists
    const mapElement = document.getElementById('map');
    
    if (!mapElement) {
        console.error('Map element not found in DOM');
        return;
    }
    
    if (typeof L === 'undefined') {
        mapElement.innerHTML = '<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: #f0f0f0; color: #666; text-align: center; padding: 20px;"><div><h3>Map Loading...</h3><p>Please ensure you have an internet connection to load the interactive map.</p></div></div>';
        console.error('Leaflet library not loaded. Please check your internet connection.');
        return;
    }
    
    initializeMap();
});

function initializeMap() {
// Initialize the map centered on China
const map = L.map('map').setView([35.8617, 104.1954], 5);

// Add OpenStreetMap tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
}).addTo(map);

// Custom icons for different types of locations
const damIcon = L.divIcon({
    html: '<span aria-label="Dam">🏗️</span>',
    iconSize: [30, 30],
    className: 'emoji-icon'
});

const diversionIcon = L.divIcon({
    html: '<span aria-label="Water Diversion">💧</span>',
    iconSize: [30, 30],
    className: 'emoji-icon'
});

const riverIcon = L.divIcon({
    html: '<span aria-label="River">🌊</span>',
    iconSize: [30, 30],
    className: 'emoji-icon'
});

const reservoirIcon = L.divIcon({
    html: '<span aria-label="Reservoir">⛵</span>',
    iconSize: [30, 30],
    className: 'emoji-icon'
});

// Hydrology data for China
const hydroData = {
    megaDams: [
        {
            name: "Three Gorges Dam",
            coords: [30.8239, 111.0031],
            type: "Mega Dam",
            description: "The world's largest hydroelectric power station by total capacity (22,500 MW).",
            details: {
                river: "Yangtze River",
                construction: "1994-2012",
                height: "181 meters",
                length: "2,335 meters",
                reservoir: "660 km long",
                capacity: "39.3 billion cubic meters"
            },
            environmentalImpacts: {
                positive: [
                    "Flood control - protects 15 million people downstream",
                    "Clean energy generation - reduces CO2 emissions by 100 million tons annually",
                    "Improved navigation on Yangtze River",
                    "Water supply for agriculture and industry"
                ],
                negative: [
                    "Displaced 1.3 million people from 13 cities and 1,352 villages",
                    "Submerged archaeological and cultural sites",
                    "Altered sediment flow affecting downstream ecosystems",
                    "Increased seismic activity in the region",
                    "Endangered aquatic species (Chinese sturgeon, Yangtze dolphin)",
                    "Changed local climate and increased landslide risks"
                ]
            }
        },
        {
            name: "Xiluodu Dam",
            coords: [28.2617, 103.6433],
            type: "Mega Dam",
            description: "China's second-largest hydroelectric dam on the Jinsha River.",
            details: {
                river: "Jinsha River (Upper Yangtze)",
                construction: "2005-2014",
                height: "285.5 meters",
                capacity: "13,860 MW"
            },
            environmentalImpacts: {
                positive: [
                    "Renewable energy generation",
                    "Flood control for downstream areas"
                ],
                negative: [
                    "Habitat disruption for endemic species",
                    "Sediment retention affecting river ecology",
                    "Displacement of local communities"
                ]
            }
        },
        {
            name: "Xiangjiaba Dam",
            coords: [28.6383, 104.3978],
            type: "Mega Dam",
            description: "Large hydroelectric dam on the Jinsha River with 6,400 MW capacity.",
            details: {
                river: "Jinsha River",
                construction: "2006-2014",
                height: "162 meters",
                capacity: "6,400 MW"
            },
            environmentalImpacts: {
                positive: [
                    "Clean energy production",
                    "Water regulation"
                ],
                negative: [
                    "Impact on fish migration",
                    "Changed river flow patterns"
                ]
            }
        }
    ],
    
    waterDiversion: [
        {
            name: "South-North Water Diversion - Eastern Route",
            coords: [34.2667, 117.1833],
            type: "Water Diversion",
            description: "Eastern route of the massive water transfer project from Yangtze River to North China.",
            details: {
                length: "1,156 km",
                construction: "2002-2013",
                capacity: "14.8 billion cubic meters annually",
                route: "Yangtze River Delta to Tianjin"
            },
            environmentalImpacts: {
                positive: [
                    "Alleviates water scarcity in North China",
                    "Benefits over 100 million people",
                    "Supports agricultural and industrial development"
                ],
                negative: [
                    "Energy consumption for pumping water uphill",
                    "Water quality concerns along the route",
                    "Impact on ecosystems along the canals",
                    "Reduced water flow in source regions"
                ]
            }
        },
        {
            name: "South-North Water Diversion - Middle Route",
            coords: [32.6667, 111.7000],
            type: "Water Diversion",
            description: "Middle route transferring water from Danjiangkou Reservoir to Beijing and Tianjin.",
            details: {
                length: "1,432 km",
                construction: "2003-2014",
                capacity: "13.7 billion cubic meters annually",
                route: "Danjiangkou Reservoir to Beijing"
            },
            environmentalImpacts: {
                positive: [
                    "Provides clean water to Beijing and surrounding areas",
                    "Reduces groundwater over-extraction",
                    "Improved water quality in North China"
                ],
                negative: [
                    "Displacement of 330,000 people",
                    "Reduced water availability in source region (Hubei, Henan)",
                    "Impact on Han River ecosystem",
                    "High construction and maintenance costs"
                ]
            }
        },
        {
            name: "South-North Water Diversion - Western Route (Planned)",
            coords: [33.0000, 100.0000],
            type: "Water Diversion",
            description: "Planned western route to divert water from upper Yangtze tributaries to Yellow River.",
            details: {
                length: "Approximately 300-500 km",
                status: "Planning and feasibility studies",
                route: "Upper Yangtze tributaries to Yellow River headwaters"
            },
            environmentalImpacts: {
                positive: [
                    "Would address water scarcity in Northwest China",
                    "Support development in arid regions"
                ],
                negative: [
                    "Extremely high altitude construction challenges",
                    "Potential impact on Tibetan Plateau ecosystems",
                    "Concerns about geological stability",
                    "Very high costs and technical challenges"
                ]
            }
        }
    ],
    
    majorRivers: [
        {
            name: "Yangtze River",
            coords: [31.2304, 121.4737],
            type: "River",
            description: "Asia's longest river and the world's third-longest.",
            details: {
                length: "6,300 km",
                drainage: "1.8 million km²",
                importance: "Major shipping route and water source"
            }
        },
        {
            name: "Yellow River",
            coords: [37.4500, 119.0000],
            type: "River",
            description: "China's second-longest river, known as the 'cradle of Chinese civilization'.",
            details: {
                length: "5,464 km",
                drainage: "752,000 km²",
                challenge: "High sediment load and water scarcity"
            }
        },
        {
            name: "Pearl River",
            coords: [23.1000, 113.3000],
            type: "River",
            description: "Major river system in southern China flowing through Guangzhou.",
            details: {
                length: "2,400 km",
                drainage: "409,480 km²",
                importance: "Economic hub and trade route"
            }
        }
    ],
    
    reservoirs: [
        {
            name: "Danjiangkou Reservoir",
            coords: [32.5667, 111.5000],
            type: "Reservoir",
            description: "Major reservoir supplying water to the Middle Route of South-North Water Diversion.",
            details: {
                area: "1,050 km²",
                capacity: "29.05 billion cubic meters",
                role: "Source for Middle Route water transfer"
            }
        },
        {
            name: "Miyun Reservoir",
            coords: [40.3833, 116.8333],
            type: "Reservoir",
            description: "Beijing's largest reservoir and important water source.",
            details: {
                area: "188 km²",
                capacity: "4.375 billion cubic meters",
                importance: "Primary water supply for Beijing"
            }
        }
    ]
};

// Layer groups for different types of data
const megaDamsLayer = L.layerGroup();
const diversionLayer = L.layerGroup();
const riversLayer = L.layerGroup();
const reservoirsLayer = L.layerGroup();

// Function to escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to create detailed popup content
function createPopupContent(item) {
    let html = `<div class="popup-title">${escapeHtml(item.name)}</div>`;
    html += `<div class="popup-content">`;
    html += `<p><strong>Type:</strong> ${escapeHtml(item.type)}</p>`;
    html += `<p>${escapeHtml(item.description)}</p>`;
    
    if (item.details) {
        html += `<p><strong>Details:</strong></p><ul>`;
        for (const [key, value] of Object.entries(item.details)) {
            const escapedKey = escapeHtml(key.charAt(0).toUpperCase() + key.slice(1));
            const escapedValue = escapeHtml(String(value));
            html += `<li><strong>${escapedKey}:</strong> ${escapedValue}</li>`;
        }
        html += `</ul>`;
    }
    
    html += `</div>`;
    return html;
}

// Function to update info panel with detailed information
function updateInfoPanel(item) {
    const panel = document.getElementById('infoPanel');
    let html = `<h2>${escapeHtml(item.name)}</h2>`;
    html += `<p><strong>${escapeHtml(item.type)}</strong></p>`;
    html += `<p>${escapeHtml(item.description)}</p>`;
    
    if (item.details) {
        html += `<h3>Details</h3><ul>`;
        for (const [key, value] of Object.entries(item.details)) {
            const escapedKey = escapeHtml(key.charAt(0).toUpperCase() + key.slice(1));
            const escapedValue = escapeHtml(String(value));
            html += `<li><strong>${escapedKey}:</strong> ${escapedValue}</li>`;
        }
        html += `</ul>`;
    }
    
    if (item.environmentalImpacts) {
        if (item.environmentalImpacts.positive && item.environmentalImpacts.positive.length > 0) {
            html += `<div class="impact-section positive-impact">`;
            html += `<h4>✅ Positive Environmental & Social Impacts</h4>`;
            html += `<ul class="impact-list">`;
            item.environmentalImpacts.positive.forEach(impact => {
                html += `<li>${escapeHtml(impact)}</li>`;
            });
            html += `</ul></div>`;
        }
        
        if (item.environmentalImpacts.negative && item.environmentalImpacts.negative.length > 0) {
            html += `<div class="impact-section">`;
            html += `<h4>⚠️ Negative Environmental & Social Impacts</h4>`;
            html += `<ul class="impact-list">`;
            item.environmentalImpacts.negative.forEach(impact => {
                html += `<li>${escapeHtml(impact)}</li>`;
            });
            html += `</ul></div>`;
        }
    }
    
    panel.innerHTML = html;
}

// Helper function to add markers to map
function addMarkersToLayer(dataArray, icon, layer) {
    dataArray.forEach(item => {
        const marker = L.marker(item.coords, { icon: icon })
            .bindPopup(createPopupContent(item))
            .addTo(layer);
        
        marker.on('click', () => updateInfoPanel(item));
    });
}

// Add mega dams to map
addMarkersToLayer(hydroData.megaDams, damIcon, megaDamsLayer);

// Add water diversion projects to map
addMarkersToLayer(hydroData.waterDiversion, diversionIcon, diversionLayer);

// Add major rivers to map
addMarkersToLayer(hydroData.majorRivers, riverIcon, riversLayer);

// Add reservoirs to map
addMarkersToLayer(hydroData.reservoirs, reservoirIcon, reservoirsLayer);

// Add all layers to map by default
megaDamsLayer.addTo(map);
diversionLayer.addTo(map);
riversLayer.addTo(map);
reservoirsLayer.addTo(map);

// Add layer control
const overlayMaps = {
    "🏗️ Mega Dams": megaDamsLayer,
    "💧 Water Diversion Projects": diversionLayer,
    "🌊 Major Rivers": riversLayer,
    "⛵ Reservoirs": reservoirsLayer
};

L.control.layers(null, overlayMaps, { collapsed: false }).addTo(map);

// Add scale control
L.control.scale({ imperial: false, metric: true }).addTo(map);

console.log('China Water Map initialized successfully');
}
