/**
 * Timeline Generator for EduVerse
 * Generates interactive historical timeline with periods, events, and visual hints
 */

import { getCharacters } from './characters.js';

// Canonical important events in Vietnamese history
const CANONICAL_EVENTS = new Set([
  'bach_dang_1288',
  'bach_dang_938',
  'ngo_quyen_coronation',
  'ly_thai_to_capital',
  'tran_dynasty_founding',
  'le_loi_uprising',
  'binh_ngo_dai_cao',
  'chi_lang_victory'
]);

/**
 * Calculate importance score for an event
 * @param {Object} event - Event object
 * @returns {number} Score 0-100
 */
function calculateImportanceScore(event) {
  let score = 50; // Base score

  // Rule 1: Multiple characters involved (+10)
  if (event.characters_involved && event.characters_involved.length > 2) {
    score += 10;
  }

  // Rule 2: Canonical historical event (+30)
  if (CANONICAL_EVENTS.has(event.id)) {
    score += 30;
  }

  // Rule 3: Has specific date (+5)
  if (event.start_date) {
    score += 5;
  }

  // Rule 4: War/battle tags (+10)
  if (event.tags && (event.tags.includes('battle') || event.tags.includes('war'))) {
    score += 10;
  }

  // Rule 5: Cultural/education impact (+8)
  if (event.tags && (event.tags.includes('culture') || event.tags.includes('education'))) {
    score += 8;
  }

  // Rule 6: Title length (longer = more detailed = more important)
  const titleWords = event.title.split(' ').length;
  if (titleWords >= 5) score += 5;

  // Cap at 100
  return Math.min(100, score);
}

/**
 * Generate short summary from full summary
 * @param {string} fullSummary - Full event summary
 * @returns {string} Short summary (<= 18 words)
 */
function generateShortSummary(fullSummary) {
  if (!fullSummary) return '';
  
  const sentences = fullSummary.split(/[.!?]+/);
  const firstSentence = sentences[0].trim();
  
  const words = firstSentence.split(/\s+/);
  if (words.length <= 18) {
    return firstSentence;
  }
  
  // Truncate to 18 words
  return words.slice(0, 18).join(' ') + '...';
}

/**
 * Generate read more text (50-120 words)
 * @param {string} fullSummary - Full event summary
 * @param {Object} event - Event object for context
 * @returns {string} Extended summary
 */
function generateReadMore(fullSummary, event) {
  if (!fullSummary) return '';
  
  let text = fullSummary;
  const words = text.split(/\s+/);
  
  // If already in range, return as is
  if (words.length >= 50 && words.length <= 120) {
    return text;
  }
  
  // If too short, add context
  if (words.length < 50) {
    text += ` Sự kiện này diễn ra vào năm ${event.year}`;
    if (event.characters_involved && event.characters_involved.length > 0) {
      text += ` với sự tham gia của các nhân vật lịch sử quan trọng.`;
    }
    text += ` Đây là một trong những dấu mốc quan trọng trong lịch sử Việt Nam.`;
  }
  
  // If too long, truncate
  if (words.length > 120) {
    text = words.slice(0, 120).join(' ') + '...';
  }
  
  return text;
}

/**
 * Get default image URL for event
 * @param {Object} event - Event object
 * @param {Array} characters - All characters
 * @returns {string|null} Image URL
 */
function getDefaultImageUrl(event, characters) {
  // If event already has image, use it
  if (event.image_url) return event.image_url;
  
  // Try to get image from most involved character
  if (event.characters_involved && event.characters_involved.length > 0) {
    const mainCharacterId = event.characters_involved[0];
    const character = characters.find(c => c.id === mainCharacterId);
    if (character?.avatar) {
      return character.avatar;
    }
  }
  
  // Fallback to generic icon by tag
  if (event.tags) {
    if (event.tags.includes('battle') || event.tags.includes('war')) {
      return '/img/icons/battle.png';
    }
    if (event.tags.includes('culture')) {
      return '/img/icons/culture.png';
    }
    if (event.tags.includes('politics')) {
      return '/img/icons/politics.png';
    }
  }
  
  return '/img/icons/default-event.png';
}

/**
 * Assign event to period
 * @param {Object} event - Event object
 * @param {Array} periods - List of periods
 * @returns {string} Period ID
 */
function assignPeriod(event, periods) {
  const year = event.year;
  
  for (const period of periods) {
    if (year >= period.start && year <= period.end) {
      return period.id;
    }
  }
  
  return 'other';
}

/**
 * Filter events based on user query
 * @param {Array} events - All events
 * @param {Object} userQuery - Filter criteria
 * @returns {Array} Filtered events
 */
function filterEvents(events, userQuery) {
  if (!userQuery) return events;
  
  let filtered = events;
  
  // Filter by character
  if (userQuery.character_ids && userQuery.character_ids.length > 0) {
    filtered = filtered.filter(event => 
      event.characters_involved?.some(charId => 
        userQuery.character_ids.includes(charId)
      )
    );
  }
  
  // Filter by tag
  if (userQuery.tag) {
    filtered = filtered.filter(event =>
      event.tags?.includes(userQuery.tag)
    );
  }
  
  // Filter by year range
  if (userQuery.year_range) {
    const [startYear, endYear] = userQuery.year_range;
    filtered = filtered.filter(event =>
      event.year >= startYear && event.year <= endYear
    );
  }
  
  return filtered;
}

/**
 * Generate visible window range
 * @param {Array} events - Events to display
 * @param {Array} periods - All periods
 * @returns {Object} {start_year, end_year}
 */
function generateVisibleWindow(events, periods) {
  if (events.length === 0) {
    // Default to all periods
    const allYears = periods.flatMap(p => [p.start, p.end]);
    return {
      start_year: Math.min(...allYears),
      end_year: Math.max(...allYears)
    };
  }
  
  const years = events.map(e => e.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  
  // Add padding (10% on each side)
  const padding = Math.ceil((maxYear - minYear) * 0.1);
  
  return {
    start_year: minYear - padding,
    end_year: maxYear + padding
  };
}

/**
 * Generate UI action suggestions
 * @param {Array} events - Processed events
 * @param {Object} userQuery - User query
 * @returns {Array} List of suggested UI actions
 */
function generateSuggestedActions(events, userQuery) {
  const actions = [];
  
  // If filtering by character, highlight those events
  if (userQuery?.character_ids && userQuery.character_ids.length > 0) {
    const relevantEvents = events
      .filter(e => e.characters_involved?.some(id => userQuery.character_ids.includes(id)))
      .slice(0, 3);
    
    relevantEvents.forEach(event => {
      actions.push(`highlightEvent('${event.id}')`);
    });
  }
  
  // Suggest zooming to high importance events
  const topEvents = events
    .filter(e => e.importance_score >= 80)
    .sort((a, b) => b.importance_score - a.importance_score)
    .slice(0, 3);
  
  if (topEvents.length > 0) {
    const years = topEvents.map(e => e.year);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    actions.push(`zoomTo(${minYear}-${maxYear})`);
  }
  
  // Suggest character highlights
  if (userQuery?.character_ids) {
    actions.push(`highlightCharacters(${JSON.stringify(userQuery.character_ids)})`);
  }
  
  return actions;
}

/**
 * Generate timeline annotations (decade markers, important notes)
 * @param {Array} periods - Periods
 * @param {Array} events - Events
 * @returns {Array} Annotations
 */
function generateAnnotations(periods, events) {
  const annotations = [];
  
  // Add period start/end annotations
  periods.forEach(period => {
    annotations.push({
      year: period.start,
      text: `Bắt đầu ${period.label}`,
      type: 'period_start'
    });
    
    annotations.push({
      year: period.end,
      text: `Kết thúc ${period.label}`,
      type: 'period_end'
    });
  });
  
  // Add annotations for high importance events
  const majorEvents = events.filter(e => e.importance_score >= 90);
  majorEvents.forEach(event => {
    annotations.push({
      year: event.year,
      text: `Sự kiện trọng đại: ${event.title}`,
      type: 'major_event'
    });
  });
  
  return annotations;
}

/**
 * Generate precomputed tiles for virtualization
 * @param {Array} events - All events
 * @returns {Object} Tiles grouped by decade
 */
function generatePrecomputedTiles(events) {
  const tiles = {};
  
  events.forEach(event => {
    const decade = Math.floor(event.year / 10) * 10;
    const key = `${decade}s`;
    
    if (!tiles[key]) {
      tiles[key] = {
        decade,
        start_year: decade,
        end_year: decade + 9,
        events: [],
        event_count: 0,
        importance_sum: 0
      };
    }
    
    tiles[key].events.push(event.id);
    tiles[key].event_count++;
    tiles[key].importance_sum += event.importance_score || 50;
  });
  
  // Calculate average importance per decade
  Object.values(tiles).forEach(tile => {
    tile.avg_importance = tile.importance_sum / tile.event_count;
  });
  
  return tiles;
}

/**
 * Main timeline generation function
 * @param {Object} input - Input parameters
 * @returns {Object} Timeline JSON
 */
export function generateTimeline(input) {
  const {
    periods = [],
    events = [],
    user_query = null,
    display_options = {}
  } = input;
  
  // Get all characters for image lookup
  const characters = getCharacters();
  
  // Filter events based on user query
  let filteredEvents = filterEvents(events, user_query);
  
  // Limit to 500 events
  const hasMore = filteredEvents.length > 500;
  const continuationToken = hasMore ? `page_${Math.floor(filteredEvents.length / 500)}` : null;
  filteredEvents = filteredEvents.slice(0, 500);
  
  // Process each event
  const processedEvents = filteredEvents.map(event => {
    // Calculate importance if not provided
    const importance = event.importance_score || calculateImportanceScore(event);
    
    // Generate summaries
    const shortSummary = event.short_summary || generateShortSummary(event.summary);
    const readMore = event.read_more || generateReadMore(event.summary, event);
    
    // Get image
    const imageUrl = getDefaultImageUrl(event, characters);
    
    // Assign period
    const periodId = assignPeriod(event, periods);
    
    return {
      id: event.id,
      title: `${event.title} (${event.year})`,
      year: event.year,
      start_date: event.start_date,
      end_date: event.end_date,
      short_summary: shortSummary,
      read_more: readMore,
      summary: event.summary,
      importance_score: importance,
      image_url: imageUrl,
      characters_involved: event.characters_involved || [],
      tags: event.tags || [],
      period_id: periodId
    };
  });
  
  // Sort by year, then by importance
  processedEvents.sort((a, b) => {
    if (a.year !== b.year) return a.year - b.year;
    return b.importance_score - a.importance_score;
  });
  
  // Generate visible window
  const visibleWindow = generateVisibleWindow(processedEvents, periods);
  
  // Generate annotations
  const annotations = generateAnnotations(periods, processedEvents);
  
  // Generate precomputed tiles
  const precomputedTiles = generatePrecomputedTiles(processedEvents);
  
  // Generate UI suggestions
  const suggestedActions = generateSuggestedActions(processedEvents, user_query);
  
  // Determine color scheme
  const colorBy = display_options.color_by || 'period';
  const iconMode = display_options.icon_mode || 'auto';
  
  // Build final output
  const timeline = {
    periods: periods.map(p => ({
      ...p,
      event_count: processedEvents.filter(e => e.period_id === p.id).length
    })),
    lanes: [
      {
        id: 'events',
        label: 'Sự kiện lịch sử',
        items: processedEvents
      }
    ],
    visible_window: visibleWindow,
    annotations,
    visual_hints: {
      color_by: colorBy,
      icon: iconMode,
      granularity: display_options.granularity || 'year',
      locale: display_options.locale || 'vi'
    },
    precomputed_tiles: precomputedTiles,
    suggested_UI_actions: suggestedActions,
    metadata: {
      total_events: events.length,
      displayed_events: processedEvents.length,
      has_more: hasMore,
      continuation_token: continuationToken,
      generated_at: new Date().toISOString()
    }
  };
  
  return timeline;
}

/**
 * Get importance level label
 * @param {number} score - Importance score
 * @returns {string} Level label
 */
export function getImportanceLevel(score) {
  if (score >= 80) return 'high';
  if (score >= 60) return 'medium';
  return 'low';
}
