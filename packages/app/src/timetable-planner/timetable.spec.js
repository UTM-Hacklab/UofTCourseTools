import test from 'ava';
import { generateTimetables, createTimetable } from './index';
const ONE_COURSE_L1_P2 = [{
        "code": "CSC108H5F",
        "meeting_sections": [
            {
                "code": "L0101",
                "instructors": ["A Petersen"],
                "times": [
                    {
                        "day": "MONDAY",
                        "start": 32400,
                        "end": 36000,
                        "duration": 3600,
                        "location": "MN 1270"
                    }, {
                        "day": "WEDNESDAY",
                        "start": 32400,
                        "end": 36000,
                        "duration": 3600,
                        "location": "MN 1270"
                    }, {
                        "day": "FRIDAY",
                        "start": 32400,
                        "end": 36000,
                        "duration": 3600,
                        "location": "MN 1270"
                    }
                ],
            }, {
                "code": "P0101",
                "instructors": [],
                "times": [
                    {
                        "day": "MONDAY",
                        "start": 32400,
                        "end": 39600,
                        "duration": 7200,
                        "location": "DH 2010"
                    }
                ],
            }, {
                "code": "P0102",
                "instructors": [],
                "times": [
                    {
                        "day": "MONDAY",
                        "start": 39600,
                        "end": 46800,
                        "duration": 7200,
                        "location": "DH 2010"
                    }
                ],
            }
        ]
    }];
const TWO_COURSE_L1_P2 = [
    {
        "code": "CSC108H5F",
        "meeting_sections": [
            {
                "code": "L0101",
                "instructors": ["A Petersen"],
                "times": [
                    {
                        "day": "MONDAY",
                        "start": 32400,
                        "end": 36000,
                        "duration": 3600,
                        "location": "MN 1270"
                    }, {
                        "day": "WEDNESDAY",
                        "start": 32400,
                        "end": 36000,
                        "duration": 3600,
                        "location": "MN 1270"
                    }, {
                        "day": "FRIDAY",
                        "start": 32400,
                        "end": 36000,
                        "duration": 3600,
                        "location": "MN 1270"
                    }
                ],
            }, {
                "code": "P0101",
                "instructors": [],
                "times": [
                    {
                        "day": "MONDAY",
                        "start": 32400,
                        "end": 39600,
                        "duration": 7200,
                        "location": "DH 2010"
                    }
                ],
            }, {
                "code": "P0102",
                "instructors": [],
                "times": [
                    {
                        "day": "MONDAY",
                        "start": 39600,
                        "end": 46800,
                        "duration": 7200,
                        "location": "DH 2010"
                    }
                ],
            }
        ]
    },
    {
        "code": "CSC318H5S",
        "meeting_sections": [
            {
                "code": "L0101",
                "instructors": ["D Wigdor"],
                "times": [
                    {
                        "day": "TUESDAY",
                        "start": 68400,
                        "end": 75600,
                        "duration": 7200,
                        "location": "MN 2190"
                    }, {
                        "day": "WEDNESDAY",
                        "start": 68400,
                        "end": 75600,
                        "duration": 7200,
                        "location": "MN 2190"
                    }
                ],
            }, {
                "code": "T0101",
                "instructors": [],
                "times": [
                    {
                        "day": "THURSDAY",
                        "start": 68400,
                        "end": 75600,
                        "duration": 7200,
                        "location": "MN 2190"
                    }
                ],
            }
        ]
    }
];
const RESULT_2_L1_P2 = [
    {
        FRIDAY: [
            {
                sectionCode: 'L0101',
                code: 'CSC108H5F',
                day: 'FRIDAY',
                duration: 3600,
                end: 36000,
                instructors: [
                    'A Petersen',
                ],
                location: 'MN 1270',
                start: 32400,
            },
        ],
        MONDAY: [
            {
                sectionCode: 'L0101',
                code: 'CSC108H5F',
                day: 'MONDAY',
                duration: 3600,
                end: 36000,
                instructors: [
                    'A Petersen',
                ],
                location: 'MN 1270',
                start: 32400,
            },
            {
                sectionCode: 'P0102',
                code: 'CSC108H5F',
                day: 'MONDAY',
                duration: 7200,
                end: 46800,
                instructors: [],
                location: 'DH 2010',
                start: 39600,
            },
        ],
        THURSDAY: [
            {
                sectionCode: 'T0101',
                code: 'CSC318H5S',
                day: 'THURSDAY',
                duration: 7200,
                end: 75600,
                instructors: [],
                location: 'MN 2190',
                start: 68400,
            },
        ],
        TUESDAY: [
            {
                code: 'CSC318H5S',
                sectionCode: 'L0101',
                day: 'TUESDAY',
                duration: 7200,
                end: 75600,
                instructors: [
                    'D Wigdor',
                ],
                location: 'MN 2190',
                start: 68400,
            },
        ],
        WEDNESDAY: [
            {
                sectionCode: 'L0101',
                code: 'CSC108H5F',
                day: 'WEDNESDAY',
                duration: 3600,
                end: 36000,
                instructors: [
                    'A Petersen',
                ],
                location: 'MN 1270',
                start: 32400,
            },
            {
                code: 'CSC318H5S',
                sectionCode: 'L0101',
                day: 'WEDNESDAY',
                duration: 7200,
                end: 75600,
                instructors: [
                    'D Wigdor',
                ],
                location: 'MN 2190',
                start: 68400,
            },
        ],
    },
];
const RESULT_1_L1_P2 = [
    {
        FRIDAY: [
            {
                sectionCode: 'L0101',
                code: 'CSC108H5S',
                day: 'FRIDAY',
                duration: 3600,
                end: 36000,
                instructors: [
                    'A Petersen',
                ],
                location: 'MN 1270',
                start: 32400,
            },
        ],
        MONDAY: [
            {
                code: 'CSC108H5F',
                sectionCode: 'L0101',
                day: 'MONDAY',
                duration: 3600,
                end: 36000,
                instructors: [
                    'A Petersen',
                ],
                location: 'MN 1270',
                start: 32400,
            },
            {
                code: 'CSC108H5F',
                sectionCode: 'P0102',
                day: 'MONDAY',
                duration: 7200,
                end: 46800,
                instructors: [],
                location: 'DH 2010',
                start: 39600,
            },
        ],
        THURSDAY: [],
        TUESDAY: [],
        WEDNESDAY: [
            {
                code: 'CSC108H5FL0101',
                sectionCode: 'L0101',
                day: 'WEDNESDAY',
                duration: 3600,
                end: 36000,
                instructors: [
                    'A Petersen',
                ],
                location: 'MN 1270',
                start: 32400,
            },
        ],
    },
];
const SECTION_L1_P2 = [
    {
        code: 'L0101',
        instructors: [
            'A Petersen',
        ],
        times: [
            {
                day: 'MONDAY',
                duration: 3600,
                end: 36000,
                location: 'MN 1270',
                start: 32400,
            },
            {
                day: 'WEDNESDAY',
                duration: 3600,
                end: 36000,
                location: 'MN 1270',
                start: 32400,
            },
            {
                day: 'FRIDAY',
                duration: 3600,
                end: 36000,
                location: 'MN 1270',
                start: 32400,
            },
        ],
    },
    {
        code: 'P0102',
        instructors: [],
        times: [
            {
                day: 'MONDAY',
                duration: 7200,
                end: 46800,
                location: 'DH 2010',
                start: 39600,
            },
        ],
    },
];
const resultTimetable = {
    FRIDAY: [
        {
            sectionCode: 'L0101',
            code: "CSC108H5F",
            day: 'FRIDAY',
            duration: 3600,
            end: 36000,
            instructors: [
                'A Petersen',
            ],
            location: 'MN 1270',
            start: 32400,
        },
    ],
    MONDAY: [
        {
            sectionCode: 'L0101',
            code: "CSC108H5F",
            day: 'MONDAY',
            duration: 3600,
            end: 36000,
            instructors: [
                'A Petersen',
            ],
            location: 'MN 1270',
            start: 32400,
        },
        {
            sectionCode: 'P0102',
            code: "CSC108H5F",
            day: 'MONDAY',
            duration: 7200,
            end: 46800,
            instructors: [],
            location: 'DH 2010',
            start: 39600,
        },
    ],
    THURSDAY: [],
    TUESDAY: [],
    WEDNESDAY: [
        {
            sectionCode: 'L0101',
            code: "CSC108H5F",
            day: 'WEDNESDAY',
            duration: 3600,
            end: 36000,
            instructors: [
                'A Petersen',
            ],
            location: 'MN 1270',
            start: 32400,
        },
    ],
};
test('Test create timetable', async (t) => {
    const timetable = createTimetable(SECTION_L1_P2);
    t.deepEqual(timetable, resultTimetable);
});
test('Test timetable generator', async (t) => {
    const timetable = generateTimetables(ONE_COURSE_L1_P2);
    t.deepEqual(timetable, RESULT_1_L1_P2);
    const timetable2 = generateTimetables(TWO_COURSE_L1_P2);
    t.deepEqual(timetable2, RESULT_2_L1_P2);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZXRhYmxlLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdGltZXRhYmxlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFHN0QsTUFBTSxnQkFBZ0IsR0FBYSxDQUFDO1FBQ2hDLE1BQU0sRUFBRSxXQUFXO1FBQ25CLGtCQUFrQixFQUFFO1lBQ2hCO2dCQUNJLE1BQU0sRUFBRSxPQUFPO2dCQUNmLGFBQWEsRUFBRSxDQUFDLFlBQVksQ0FBQztnQkFDN0IsT0FBTyxFQUFFO29CQUNMO3dCQUNJLEtBQUssRUFBRSxRQUFRO3dCQUNmLE9BQU8sRUFBRSxLQUFLO3dCQUNkLEtBQUssRUFBRSxLQUFLO3dCQUNaLFVBQVUsRUFBRSxJQUFJO3dCQUNoQixVQUFVLEVBQUUsU0FBUztxQkFDeEIsRUFBRTt3QkFDQyxLQUFLLEVBQUUsV0FBVzt3QkFDbEIsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsS0FBSyxFQUFFLEtBQUs7d0JBQ1osVUFBVSxFQUFFLElBQUk7d0JBQ2hCLFVBQVUsRUFBRSxTQUFTO3FCQUN4QixFQUFFO3dCQUNDLEtBQUssRUFBRSxRQUFRO3dCQUNmLE9BQU8sRUFBRSxLQUFLO3dCQUNkLEtBQUssRUFBRSxLQUFLO3dCQUNaLFVBQVUsRUFBRSxJQUFJO3dCQUNoQixVQUFVLEVBQUUsU0FBUztxQkFDeEI7aUJBQ0o7YUFDSixFQUFFO2dCQUNDLE1BQU0sRUFBRSxPQUFPO2dCQUNmLGFBQWEsRUFBRSxFQUFFO2dCQUNqQixPQUFPLEVBQUU7b0JBQ0w7d0JBQ0ksS0FBSyxFQUFFLFFBQVE7d0JBQ2YsT0FBTyxFQUFFLEtBQUs7d0JBQ2QsS0FBSyxFQUFFLEtBQUs7d0JBQ1osVUFBVSxFQUFFLElBQUk7d0JBQ2hCLFVBQVUsRUFBRSxTQUFTO3FCQUN4QjtpQkFD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