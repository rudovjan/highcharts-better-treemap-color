$(function () {
    $('#chartWith').highcharts({
        colorAxis: {
            lowerColors: {
                minColor: '#f04d5a',
                maxColor: '#fdedee'
            },
            upperColors: {
                minColor: '#e5f8f4',
                maxColor: '#04c197'
            }
        },
        series: [{
            type: 'treemap',
            layoutAlgorithm: 'squarified',
            data: [{
                name: 'A -3',
                value: 6,
                colorValue: -3
            }, {
                name: 'B -2',
                value: 6,
                colorValue: -2
            }, {
                name: 'C -1',
                value: 4,
                colorValue: -1
            }, {
                name: 'D 0',
                value: 3,
                colorValue: 0
            }, {
                name: 'E 1',
                value: 2,
                colorValue: 1
            }, {
                name: 'F 2',
                value: 2,
                colorValue: 2
            }, {
                name: 'G 3',
                value: 1,
                colorValue: 3
            }]
        }],
        title: {
            text: ''
        }
    });
});