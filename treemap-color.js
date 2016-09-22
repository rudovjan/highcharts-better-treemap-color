(function(H) {

  H.wrap(H.ColorAxis.prototype, 'setLegendColor', function(proceed) {
    var grad,
      horiz = this.horiz,
      options = this.options,
      reversed = this.reversed,
      one = reversed ? 1 : 0,
      zero = reversed ? 0 : 1;

    if (this.chart.options.colorAxis.lowerColors &&
      this.chart.options.colorAxis.upperColors &&
      (this.min !== undefined || this.min !== null)) {

      var middlePoint = (this.min + this.max) / 2
      var pos = 1 - ((this.max - middlePoint) / ((this.max - this.min) || 1));
      var lowerColors = this.chart.options.colorAxis.lowerColors;
      var upperColors = this.chart.options.colorAxis.upperColors;


      grad = horiz ? [ one, 0, zero, 0 ] : [ 0, zero, 0, one ]; // #3190
      this.legendColor = {
        linearGradient: { x1: grad[ 0 ], y1: grad[ 1 ], x2: grad[ 2 ], y2: grad[ 3 ] },
        stops: [
          [ 0, lowerColors.minColor ], [ pos, upperColors.minColor ], [ 1, upperColors.maxColor ]
        ]
      };
    } else {
      proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    }
  });


  H.wrap(H.ColorAxis.prototype, 'toColor', function(proceed) {
    var pos,
      stops = this.stops,
      from,
      to,
      color,
      dataClasses = this.dataClasses,
      dataClass,
      i,
      chart = this.chart,
      legend = chart.legend;


    if (this.chart.options.colorAxis.lowerColors &&
      this.chart.options.colorAxis.upperColors) {

      var value = arguments[ 1 ];
      var lowerColors = this.chart.options.colorAxis.lowerColors;
      var upperColors = this.chart.options.colorAxis.upperColors;

      var middlePoint = (this.min + this.max) / 2;

      var min = this.min;
      var max = this.max;

      var colorsToPick = {
        minColor: '#ffffff',
        maxColor: '#ffffff'
      };

      if (value >= middlePoint) {
        // upper value
        min = middlePoint;
        colorsToPick = upperColors;
      } else if(value < middlePoint) {
        // lower value
        max = middlePoint;
        colorsToPick = lowerColors;
      }

      pos = 1 - ((max - value) / ((max - min) || 1));


      color = this.tweenColors(
        H.Color(colorsToPick.minColor),
        H.Color(colorsToPick.maxColor),
        pos
      );

      this.setLegendColor();
      legend.colorizeItem(this, true);

      return color;
    } else {
      return proceed.apply(this, Array.prototype.slice.call(arguments, 1));
    }

  });
}(Highcharts));
