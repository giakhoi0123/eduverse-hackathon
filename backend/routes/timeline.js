import express from 'express';
import { generateTimeline, getImportanceLevel } from '../utils/timeline-generator.js';
import { 
  getSampleTimelineData, 
  getEventsByPeriod, 
  getEventsByCharacter,
  getEventsByYearRange,
  PERIODS,
  EVENTS
} from '../data/timeline-data.js';

const router = express.Router();

/**
 * POST /api/timeline/generate
 * Generate timeline with custom data and filters
 * 
 * Body:
 * {
 *   periods: [...],        // Optional: custom periods, defaults to Vietnamese history periods
 *   events: [...],         // Optional: custom events, defaults to sample events
 *   user_query: {          // Optional: filters
 *     character_ids: [...],
 *     tag: "battle",
 *     year_range: [1200, 1300]
 *   },
 *   display_options: {     // Optional: display preferences
 *     granularity: "year|decade|century",
 *     locale: "vi",
 *     color_by: "period|importance",
 *     icon_mode: "auto|war|culture|politics"
 *   }
 * }
 */
router.post('/generate', async (req, res) => {
  try {
    const startTime = Date.now();
    
    const {
      periods = PERIODS,
      events = EVENTS,
      user_query = null,
      display_options = {}
    } = req.body;

    // Validate input
    if (!Array.isArray(periods) || !Array.isArray(events)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input: periods and events must be arrays'
      });
    }

    // Generate timeline
    const timeline = generateTimeline({
      periods,
      events,
      user_query,
      display_options
    });

    const processingTime = Date.now() - startTime;

    res.json({
      success: true,
      data: timeline,
      performance: {
        processing_time_ms: processingTime,
        events_processed: timeline.lanes[0].items.length,
        total_events: events.length
      }
    });

  } catch (error) {
    console.error('Timeline generation error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate timeline',
      details: error.message
    });
  }
});

/**
 * GET /api/timeline/default
 * Get default Vietnamese history timeline
 */
router.get('/default', async (req, res) => {
  try {
    const { periods, events } = getSampleTimelineData();
    
    const timeline = generateTimeline({
      periods,
      events,
      display_options: {
        granularity: 'year',
        locale: 'vi',
        color_by: 'period'
      }
    });

    res.json({
      success: true,
      data: timeline
    });

  } catch (error) {
    console.error('Default timeline error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load default timeline',
      details: error.message
    });
  }
});

/**
 * GET /api/timeline/period/:periodId
 * Get timeline filtered by period
 */
router.get('/period/:periodId', async (req, res) => {
  try {
    const { periodId } = req.params;
    const events = getEventsByPeriod(periodId);

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Period not found or has no events'
      });
    }

    const period = PERIODS.find(p => p.id === periodId);
    
    const timeline = generateTimeline({
      periods: [period],
      events,
      display_options: {
        granularity: 'year',
        locale: 'vi'
      }
    });

    res.json({
      success: true,
      data: timeline
    });

  } catch (error) {
    console.error('Period timeline error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load period timeline',
      details: error.message
    });
  }
});

/**
 * GET /api/timeline/character/:characterId
 * Get timeline filtered by character
 */
router.get('/character/:characterId', async (req, res) => {
  try {
    const { characterId } = req.params;
    const events = getEventsByCharacter(characterId);

    if (events.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Character not found or has no events'
      });
    }

    const timeline = generateTimeline({
      periods: PERIODS,
      events,
      user_query: {
        character_ids: [characterId]
      },
      display_options: {
        granularity: 'year',
        locale: 'vi',
        highlight_mode: 'character'
      }
    });

    res.json({
      success: true,
      data: timeline
    });

  } catch (error) {
    console.error('Character timeline error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load character timeline',
      details: error.message
    });
  }
});

/**
 * GET /api/timeline/range
 * Get timeline for a year range
 * Query params: start, end
 */
router.get('/range', async (req, res) => {
  try {
    const startYear = parseInt(req.query.start);
    const endYear = parseInt(req.query.end);

    if (isNaN(startYear) || isNaN(endYear)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid year range: start and end must be numbers'
      });
    }

    if (startYear > endYear) {
      return res.status(400).json({
        success: false,
        error: 'Invalid year range: start must be <= end'
      });
    }

    const events = getEventsByYearRange(startYear, endYear);

    const timeline = generateTimeline({
      periods: PERIODS,
      events,
      user_query: {
        year_range: [startYear, endYear]
      },
      display_options: {
        granularity: req.query.granularity || 'year',
        locale: 'vi'
      }
    });

    res.json({
      success: true,
      data: timeline
    });

  } catch (error) {
    console.error('Range timeline error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load timeline range',
      details: error.message
    });
  }
});

/**
 * GET /api/timeline/periods
 * Get all available periods
 */
router.get('/periods', (req, res) => {
  res.json({
    success: true,
    data: PERIODS
  });
});

/**
 * GET /api/timeline/events
 * Get all events with optional filters
 * Query params: tag, importance_min, limit
 */
router.get('/events', (req, res) => {
  try {
    let events = [...EVENTS];

    // Filter by tag
    if (req.query.tag) {
      events = events.filter(e => e.tags.includes(req.query.tag));
    }

    // Filter by minimum importance
    if (req.query.importance_min) {
      const minImportance = parseInt(req.query.importance_min);
      events = events.filter(e => {
        const score = e.importance_score || 50;
        return score >= minImportance;
      });
    }

    // Limit results
    const limit = parseInt(req.query.limit) || 100;
    events = events.slice(0, limit);

    res.json({
      success: true,
      data: events,
      total: EVENTS.length,
      returned: events.length
    });

  } catch (error) {
    console.error('Events list error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load events',
      details: error.message
    });
  }
});

/**
 * GET /api/timeline/event/:eventId
 * Get single event details with importance analysis
 */
router.get('/event/:eventId', (req, res) => {
  try {
    const { eventId } = req.params;
    const event = EVENTS.find(e => e.id === eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        error: 'Event not found'
      });
    }

    // Calculate importance if not set
    const timeline = generateTimeline({
      periods: PERIODS,
      events: [event]
    });

    const enrichedEvent = timeline.lanes[0].items[0];
    const importanceLevel = getImportanceLevel(enrichedEvent.importance_score);

    res.json({
      success: true,
      data: {
        ...enrichedEvent,
        importance_level: importanceLevel
      }
    });

  } catch (error) {
    console.error('Event detail error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load event details',
      details: error.message
    });
  }
});

/**
 * GET /api/timeline/stats
 * Get timeline statistics
 */
router.get('/stats', (req, res) => {
  try {
    // Count events by period
    const eventsByPeriod = {};
    PERIODS.forEach(period => {
      eventsByPeriod[period.id] = getEventsByPeriod(period.id).length;
    });

    // Count events by tag
    const eventsByTag = {};
    EVENTS.forEach(event => {
      event.tags.forEach(tag => {
        eventsByTag[tag] = (eventsByTag[tag] || 0) + 1;
      });
    });

    // Year range
    const years = EVENTS.map(e => e.year);
    const yearRange = {
      earliest: Math.min(...years),
      latest: Math.max(...years),
      span: Math.max(...years) - Math.min(...years)
    };

    res.json({
      success: true,
      data: {
        total_events: EVENTS.length,
        total_periods: PERIODS.length,
        events_by_period: eventsByPeriod,
        events_by_tag: eventsByTag,
        year_range: yearRange,
        available_tags: Object.keys(eventsByTag)
      }
    });

  } catch (error) {
    console.error('Stats error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate statistics',
      details: error.message
    });
  }
});

export default router;
