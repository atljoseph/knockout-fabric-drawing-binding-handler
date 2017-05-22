var dummyInitialValue = '{"objects":[{"type":"path","originX":"center","originY":"center","left":289.71,"top":108,"width":365.41,"height":144,"fill":null,"stroke":"rgb(0, 0, 0)","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"round","strokeLineJoin":"round","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"pathOffset":{"x":289.70710678118655,"y":108},"path":[["M",471.5,36],["Q",471.5,36,472,36],["Q",472.5,36,472.25,36],["Q",472,36,470.5,36],["Q",469,36,465,38.5],["Q",461,41,456.5,44],["Q",452,47,442,52.5],["Q",432,58,418,67],["Q",404,76,392,82.5],["Q",380,89,361.5,98.5],["Q",343,108,327,116],["Q",311,124,297.5,130.5],["Q",284,137,265,144.5],["Q",246,152,238.5,155.5],["Q",231,159,224,160.5],["Q",217,162,211,164.5],["Q",205,167,200,168],["Q",195,169,187.5,170],["Q",180,171,174.5,173],["Q",169,175,163.5,176],["Q",158,177,154.5,177.5],["Q",151,178,149,178],["Q",147,178,144,178],["Q",141,178,139,179],["Q",137,180,135,180],["Q",133,180,131,180],["Q",129,180,128,180],["Q",127,180,126,180],["Q",125,180,123,180],["Q",121,180,119.5,180],["Q",118,180,116.5,179],["Q",115,178,113.5,178],["Q",112,178,111.5,177.5],["Q",111,177,110,177],["Q",109,177,108.5,176.5],["Q",108,176,107.5,176],["Q",107,176,107,175.5],["Q",107,175,107,175],["Q",107,175,107,174.5],["L",107,174]]},{"type":"path","originX":"center","originY":"center","left":353.5,"top":111.5,"width":117,"height":131,"fill":null,"stroke":"rgb(0, 0, 0)","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"round","strokeLineJoin":"round","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"pathOffset":{"x":353.5,"y":111.5},"path":[["M",295.5,46],["Q",295.5,46,296,46],["Q",296.5,46,296.25,46],["Q",296,46,296,46.5],["Q",296,47,296,47],["Q",296,47,295.5,47],["Q",295,47,295,48],["Q",295,49,295,49.5],["Q",295,50,295,51],["Q",295,52,295,53.5],["Q",295,55,295,56],["Q",295,57,295,58.5],["Q",295,60,295,61.5],["Q",295,63,295,65],["Q",295,67,295,69],["Q",295,71,295.5,73],["Q",296,75,296,77],["Q",296,79,296.5,81],["Q",297,83,297,85],["Q",297,87,298.5,89],["Q",300,91,300.5,93],["Q",301,95,302.5,97.5],["Q",304,100,306.5,102],["Q",309,104,311.5,106],["Q",314,108,318,110.5],["Q",322,113,325.5,114.5],["Q",329,116,334.5,118],["Q",340,120,344,122],["Q",348,124,351.5,125.5],["Q",355,127,358,129],["Q",361,131,363.5,132.5],["Q",366,134,368,135],["Q",370,136,372.5,137],["Q",375,138,379,140.5],["Q",383,143,386,146],["Q",389,149,392,152],["Q",395,155,397,157.5],["Q",399,160,400,162],["Q",401,164,403,165.5],["Q",405,167,406,168.5],["Q",407,170,408,170.5],["Q",409,171,409,172.5],["Q",409,174,409.5,174.5],["Q",410,175,410.5,175.5],["Q",411,176,411.5,176],["Q",412,176,412,176.5],["Q",412,177,412,177],["L",412,177]]}]}';

dummyInitialValue = '';

function drawingCanvasViewModel() {
    var d = this;
    d.canvas = {
        visible: ko.observable(true),
        draggable: ko.observable(false),
        name: ko.observable('drawing-1'),
        initial: dummyInitialValue,
        value: ko.observable(),
        image64: ko.observable(),
        width: ko.observable('350'),
        height: ko.observable('200'),
        clear: function () { console.log('dummy clear function'); },
        deleteSelected: function () { console.log('dummy deleteSelected function'); },
    };
    d.line = {
        visible: ko.observable(false),
        width: ko.observable('2'),
        color: ko.observable('blue'),
        offsetX: ko.observable('30'),
        offsetY: ko.observable('20'),
    };
    d.brush = {
        width: ko.observable('3'),
        color: ko.observable('green'),
    };

    // computed
    d.canvas.valueJSON = ko.computed(function () {
        var value = [];
        if (d.canvas.value()) {
            value = d.canvas.value();
        }
        return ko.toJSON(value);
    });

    return d;
}

var drawing = new drawingCanvasViewModel();
ko.applyBindings(drawing);