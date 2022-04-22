var express = require('express');
var router = express.Router();
var prayertimeDB = require('../public/DB.json');
var hisnul_muslim = require('../public/hisnulmuslim.json');
const { body, validationResult } = require('express-validator');

//console.log(hisnul_muslim[10]);


router.get('/v1', (req, res) => {
    res.status(200).json(prayertimeDB)
})
// create ```/prayertime/:wilaya/```
// this endpoint will return the prayer times for a given wilaya for all generated times in prayertimeDB.
// check and sanitize the wilaya parameter using express-validator
// if the wilaya is not found in the database, return an error message
// if the wilaya is found, return the prayer times for that wilaya
router.get('/v1/:city',[
    body('wilaya').isString().isLength({ min: 4, max: 15 }).withMessage('wilaya must be a string between 4 and 15 characters long')
], (req, res) => {
    const cityName = req.params.city

    const cityPrayerTime = prayertimeDB.city.filter(x => x.city.toLowerCase() === cityName.toLowerCase())

    if (cityPrayerTime.length === 0) {
        res.status(404).json({
            error: "City not found"
        })
    } else {
        res.status(200).json(cityPrayerTime)
    }


})
router.get('/v1/:city/:year', [
    body('city').isString().isLength({ min: 4, max: 15 }).withMessage('city must be a string between 4 and 15 characters long'),
    body('year').isInt({ min: 2022, max: 2023 }).withMessage('year must be a number between 2022 and 2023')
], (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    // }
    const cityName = req.params.city
    const year = req.params.year
    // convert year to number
    const yearNumber = parseInt(year)

    const cityPrayerTime = prayertimeDB.city.filter(x => x.city.toLowerCase() === cityName.toLowerCase())

    if (cityPrayerTime.length === 0) {
        re(s.status(404).json({
            error: "City not found"
        }))
    } else {
        const cityPrayerTimeYear = cityPrayerTime.filter(x => x.year === yearNumber)
        if (cityPrayerTimeYear.length === 0) {
            res.status(404).json({
                error: "Year not found"
            })
        } else {
            res.status(200).json(cityPrayerTimeYear)
        }
    }

})
// create get request for /prayertime/:city/:year/:month
router.get('/v1/:city/:year/:month', [
    body('city').isString().isLength({ min: 4, max: 15 }).withMessage('city must be a string between 4 and 15 characters long'),
    body('year').isInt({ min: 2022, max: 2023 }).withMessage('year must be a number between 2022 and 2023'),
    body('month').isInt({ min: 1, max: 12 }).withMessage('month must be a number between 1 and 12')
], (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    // }
    const cityName = req.params.city
    const year =   req.params.year
    const month = req.params.month
    // convert year to number
    const yearNumber = parseInt(year)
    const monthNumber = parseInt(month)

    const cityPrayerTime = prayertimeDB.city.filter(x => x.city.toLowerCase() === cityName.toLowerCase())

    if (cityPrayerTime.length === 0) {
        res.status(404).json({
            error: "City not found"
        })
    } else {
        const cityPrayerTimeYear = cityPrayerTime.filter(x => x.year === yearNumber)
        if (cityPrayerTimeYear.length === 0) {
            res.status(404).json({
                error: "Year not found"
            })
        } else {
            const cityPrayerTimeMonth = cityPrayerTimeYear.filter(x => x.month === monthNumber)
            if (cityPrayerTimeMonth.length === 0) {
                res.status(404).json({
                    error: "Month not found"
                })
            } else {
                res.status(200).json(cityPrayerTimeMonth)
            }
        }
    }

})

// create get request for /prayertime/:city/:year/:month/:day
router.get('/v1/:city/:year/:month/:day',[
    body('city').isString().isLength({ min: 4, max: 15 }).withMessage('city must be a string between 4 and 15 characters long'),
    body('year').isInt({ min: 2022, max: 2023 }).withMessage('year must be a number between 2022 and 2023'),
    body('month').isInt({ min: 1, max: 12 }).withMessage('month must be a number between 1 and 12'),
    body('day').isInt({ min: 1, max: 31 }).withMessage('day must be a number between 1 and 31')
], (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    // }
    const cityName = req.params.city
    const year = req.params.year
    const month = req.params.month
    const day = req.params.day
    // convert year to number
    const yearNumber = parseInt(year)
    const monthNumber = parseInt(month)
    const dayNumber = parseInt(day)

    const cityPrayerTime = prayertimeDB.city.filter(x => x.city.toLowerCase() === cityName.toLowerCase())

    if (cityPrayerTime.length === 0) {
        res.status(404).json({
            error: "City not found"
        })
    } else {
        const cityPrayerTimeYear = cityPrayerTime.filter(x => x.year === yearNumber)
        if (cityPrayerTimeYear.length === 0) {
            res.status(404).json({
                error: "Year not found"
            })
        } else {
            const cityPrayerTimeMonth = cityPrayerTimeYear.filter(x => x.month === monthNumber)
            if (cityPrayerTimeMonth.length === 0) {
                res.status(404).json({
                    error: "Month not found"
                })
            } else {
                const cityPrayerTimeDay = cityPrayerTimeMonth.filter(x => x.day === dayNumber)
                if (cityPrayerTimeDay.length === 0) {
                    res.status(404).json({
                        error: "Day not found"
                    })
                } else {
                    res.status(200).json(cityPrayerTimeDay)
                }
            }
        }
    }
})

// create get request for /prayertime/:city/:year/:month/:day/:eventname
router.get('/v1/:city/:year/:month/:day/:eventname',[
    body('city').isString().isLength({ min: 4, max: 15 }).withMessage('city must be a string between 4 and 15 characters long'),
    body('year').isInt({ min: 2022, max: 2023 }).withMessage('year must be a number between 2022 and 2023'),
    body('month').isInt({ min: 1, max: 12 }).withMessage('month must be a number between 1 and 12'),
    body('day').isInt({ min: 1, max: 31 }).withMessage('day must be a number between 1 and 31'),
    body('eventname').isString().isLength({ min: 3, max: 15 }).withMessage('eventname must be a string between 3 and 15 characters long')
], (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(422).json({ errors: errors.array() });
    // }
    const cityName = req.params.city
    const year = req.params.year
    const month = req.params.month
    const day = req.params.day
    const eventName = req.params.eventname.toLowerCase()
    // convert year to number
    const yearNumber = parseInt(year)
    const monthNumber = parseInt(month)
    const dayNumber = parseInt(day)

    const cityPrayerTime = prayertimeDB.city.filter(x => x.city.toLowerCase() === cityName.toLowerCase())

    if (cityPrayerTime.length === 0) {
        res.status(404).json({
            error: "City not found"
        })
    } else {
        const cityPrayerTimeYear = cityPrayerTime.filter(x => x.year === yearNumber)
        if (cityPrayerTimeYear.length === 0) {
            res.status(404).json({
                error: "Year not found"
            })
        } else {
            const cityPrayerTimeMonth = cityPrayerTimeYear.filter(x => x.month === monthNumber)
            if (cityPrayerTimeMonth.length === 0) {
                res.status(404).json({
                    error: "Month not found"
                })
            } else {
                const cityPrayerTimeDay = cityPrayerTimeMonth.filter(x => x.day === dayNumber)
                if (cityPrayerTimeDay.length === 0) {
                    res.status(404).json({
                        error: "Day not found"
                    })
                } else {
                    // check if attribute eventname exists
                    if (cityPrayerTimeDay[0].hasOwnProperty(eventName)) {
                        res.status(200).json(cityPrayerTimeDay[0][eventName])
                    } else {
                        res.status(404).json({
                            error: "Eventdfjqmfjq not found"
                        })
                    }

                }
            }
        }
    }
})



module.exports = router;