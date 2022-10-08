const dagJson = {
    "nodes": [
        {
            "id": 2,
            "title": "Node",
            "x": 585,
            "y": 240
        },
        {
            "id": 3,
            "title": "Node",
            "x": 927,
            "y": 298
        },
        {
            "id": 4,
            "title": "Node",
            "x": 763,
            "y": 142
        },
        {
            "id": 5,
            "title": "Node",
            "x": 364,
            "y": 236
        },
        {
            "id": 6,
            // "title": "random variable",
            "x": 587,
            "y": 420
        }
    ],
    "edges": [
        {
            "source": 2,
            "target": 4
        },
        {
            "source": 4,
            "target": 3
        },
        {
            "source": 5,
            "target": 2
        },
        {
            "source": 2,
            "target": 6
        },
        {
            "source": 3,
            "target": 6
        }
    ]
}

export function getDag() {
    return dagJson
}
