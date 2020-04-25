"use strict";
const chance = require("chance").Chance();

/**
 * Creates a random mock user account 
 */
const createMockPost = () => {
    const _department_id = chance.integer({ min: 1, max: 62 });
    const _title = chance.sentence({ words: 5 });
    const _body = chance.paragraph({ sentences: 5 });
    const _incident_date = chance.date({ string: true });
    const _attitude = chance.integer({ min: 1, max: 5 });
    const _communication = chance.integer({ min: 1, max: 5 });
    const _efficiency = chance.integer({ min: 1, max: 5 });
    const _fairness = chance.integer({ min: 1, max: 5 });
    const _safety = chance.integer({ min: 1, max: 5 });

    return {
        department_id: _department_id,
        title: _title,
        body: _body,
        incident_date:_incident_date,
        attitude:_attitude,
        communication:_communication,
        efficiency: _efficiency,
        fairness: _fairness,
        safety : _safety
    };
}

module.exports = { createMockPost }