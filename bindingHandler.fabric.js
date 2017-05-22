
ko.bindingHandlers.fabricDrawing = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var d = this;

        // instantiate the canvas object
        d.canvas = this.__canvas = new fabric.Canvas(element);

        //
        // draggable/selectable vs. drawing mode ?
        // console.log(d.controlNameObservable());
        d.controlDraggableObservable = valueAccessor().canvas.draggable;
        d.controlDraggableObservable.subscribe(function (newValue) {
            //console.log(newValue);
            d.canvas.isDrawingMode = !newValue;
            d.canvas.selection = newValue;
            d.canvas.forEachObject(function (o) {
                if (o.type == 'path') {
                    o.selectable = newValue;
                }
            });
            d.canvas.renderAll.bind(d.canvas);
        });
        d.controlDraggableObservable.valueHasMutated();

        //
        // manually apply binding of id and name of element with controlNAmeObservable
        // console.log(d.controlNameObservable());
        d.controlNameObservable = valueAccessor().canvas.name;
        ko.applyBindingsToNode(element, { attr: { name: d.controlNameObservable, id: d.controlNameObservable } });
        d.controlNameObservable.subscribe(function (newValue) {
            // console.log(newValue);
            //console.log(element.name);
        });
        d.controlNameObservable.valueHasMutated();

        //
        // the actual value observable for control:
        // apply a default for initialization purposes
        // console.log(d.controlValueObservable());
        d.controlValueObservable = valueAccessor().canvas.value;
        d.controlValueObservable(d.controlValueObservable() || []);
        d.controlValueObservable.subscribe(function (newValue) {
            //console.log(d.canvas.toDatalessJSON());
            //console.log(newValue);
        });

        //
        // the actual image base 64 observable representation of the user input on this drawing control instance
        // apply a default for initialization purposes
        // console.log(d.controlImage64Observable());
        d.controlImage64Observable = valueAccessor().canvas.image64;
        d.controlImage64Observable.subscribe(function (newValue) {
            //console.log(d.canvas.toDataURL());
            //console.log(newValue);
            // console.log(newValue.length);
        });
        d.controlImage64Observable('data:image/png;base64,');

        //
        // this might be a default value, or it could be data to populate a drawing (for editing or viewing) from the database
        // console.log(d.controlInitialStaticValue);
        d.controlInitialStaticValue = valueAccessor().canvas.initial;
        if (d.controlInitialStaticValue) {
            d.canvas.loadFromJSON(d.controlInitialStaticValue, d.canvas.renderAll.bind(d.canvas));
            d.controlValueObservable(d.controlInitialStaticValue);
        }

         d.updateSigLine = function () {
            if (d.sigLineStaticObject) {
                d.sigLineStaticObject.set({
                    x1: parseInt(d.sigLineOffsetXObservable()),
                    y1: parseInt(d.controlHeightObservable() - d.sigLineOffsetYObservable()),
                    x2: parseInt(d.controlWidthObservable() - d.sigLineOffsetXObservable()),
                    y2: parseInt(d.controlHeightObservable() - d.sigLineOffsetYObservable()),
                    fill: d.sigLineColorObservable(),
                    stroke: d.sigLineColorObservable(),
                    strokeWidth: parseInt(d.sigLineWidthObservable()),
                    visible: d.sigLineVisibleObservable()
                });
                d.canvas.trigger('mouse:down', {});
                d.canvas.renderAll.bind(d.canvas);
                // d.canvas.setActiveObject(d.sigLineStaticObject);
                // console.log('signature line updated');
            }
            // else{
            //     console.log('signature line not updated because it hasn\'t been added to the canvas yet);
            // }
        }

        //
        // the actual width of the control
        // for image (display mode) or drawing (input mode)
        // apply the bindings to the root node
        // console.log(d.controlWidthObservable());
        d.controlWidthObservable = valueAccessor().canvas.width;
        ko.applyBindingsToNode(element, { attr: { width: d.controlWidthObservable } });
        d.controlWidthObservable.subscribe(function (newValue) {
            // console.log(newValue);
            d.canvas.setWidth(parseInt(newValue));
            d.canvas.calcOffset();
            d.updateSigLine();
            
            //d.canvas.renderAll.bind(d.canvas);
        });
        d.controlWidthObservable.valueHasMutated();

        //
        // the actual height of the control
        // for image (display mode) or drawing (input mode)
        // console.log(d.controlHeightObservable());
        d.controlHeightObservable = valueAccessor().canvas.height;
        ko.applyBindingsToNode(element, { attr: { height: d.controlHeightObservable() + 'px' } });
        d.controlHeightObservable.subscribe(function (newValue) {
            // console.log(newValue);
            d.canvas.setHeight(parseInt(newValue));
            d.canvas.calcOffset();
            d.updateSigLine();
            //d.canvas.renderAll.bind(d.canvas);
        });
        d.controlHeightObservable.valueHasMutated();

        //
        // the visibility of the canvas input portion of the drawing control
        d.controlVisibleObservable = valueAccessor().canvas.visible;
        d.controlVisibleObservable.subscribe(function (newValue) {
            console.log(newValue);
            var visibility = 'none';
            if (newValue) {
                visibility = 'block';
            }
            element.parentNode.style.display = visibility;
        });
        d.controlVisibleObservable.valueHasMutated();

        // //
        // // the actual display mode of the control
        // // for image (display mode) or drawing (input mode)
        // d.controlModeObservable = valueAccessor().canvas.mode;
        // d.controlModeObservable.subscribe(function(newValue){
        //     console.log(newValue);
        // });

        //
        // the actual width of the optional signature line of the control
        d.sigLineWidthObservable = valueAccessor().line.width;
        d.sigLineWidthObservable.subscribe(function (newValue) {
            // console.log(newValue);
            d.updateSigLine();
        });

        //
        // the actual color of the optional signature line of the control
        d.sigLineColorObservable = valueAccessor().line.color;
        d.sigLineColorObservable.subscribe(function (newValue) {
            // console.log(newValue);
            d.updateSigLine();
        });

        //
        // the offset in the x direction of the optional signature line of the control
        d.sigLineOffsetXObservable = valueAccessor().line.offsetX;
        d.sigLineOffsetXObservable.subscribe(function (newValue) {
            // console.log(newValue);
            d.updateSigLine();
        });

        //
        // the offset in the y direction of the optional signature line of the control
        d.sigLineOffsetYObservable = valueAccessor().line.offsetY;
        d.sigLineOffsetYObservable.subscribe(function (newValue) {
            // console.log(newValue);
            d.updateSigLine();
        });

        //
        // the visibility of the optional signature line of the control
        d.sigLineVisibleObservable = valueAccessor().line.visible;
        d.sigLineVisibleObservable.subscribe(function (newValue) {
            console.log(newValue);
            d.updateSigLine();
        });

        function signatureLine() {
            var coords = [
                parseInt(d.sigLineOffsetXObservable()),
                parseInt(d.controlHeightObservable() - d.sigLineOffsetYObservable()),
                parseInt(d.controlWidthObservable() - d.sigLineOffsetXObservable()),
                parseInt(d.controlHeightObservable() - d.sigLineOffsetYObservable()),
            ];
            // // var coords = [25, 130, 450, 130];
            // console.log(coords);
            var sigLine = new fabric.Line(coords, {
                fill: d.sigLineColorObservable(),
                stroke: d.sigLineColorObservable(),
                strokeWidth: parseInt(d.sigLineWidthObservable()),
                selectable: false,
                visible: d.sigLineVisibleObservable()
            });
            // console.log(sigLine);
            return sigLine;
        }
        d.sigLineStaticObject = new signatureLine();
        d.canvas.add(d.sigLineStaticObject);
        // simulate a setting change to fire the update
        //d.sigLineWidthObservable.valueHasMutated();


        //
        // the actual width of the drawing line of the control
        d.brushWidthObservable = valueAccessor().brush.width;
        d.brushWidthObservable.subscribe(function (newValue) {
            // console.log(newValue);
        });
        d.brushWidthObservable.valueHasMutated();

        //
        // the actual color of the drawing line of the control
        d.brushColorObservable = valueAccessor().brush.color;
        d.brushColorObservable.subscribe(function (newValue) {
            // console.log(newValue);
        });
        d.brushColorObservable.valueHasMutated();

        //
        // update items from the canvas into the model
        // console.log('updateModel');
        d.updateModel = function () {
            d.controlValueObservable(d.canvas.toDatalessJSON());
            d.controlImage64Observable(d.canvas.toDataURL());
        }

        //
        // this is kind of a reverse binding experiment
        // bind the dummy variable function from the control
        // to the canvas clear function used internally in this handler
        // console.log(valueAccessor().canvas.clear);
        valueAccessor().canvas.clear = function (resetInitialValueBool) {
            // console.log('clearing canvas, and view model. If "resetInitialValueBool" is true, then the initial value will be restored.');
            if (resetInitialValueBool && d.controlInitialStaticValue) {
                // load the json and automatically update the canvas
                d.canvas.loadFromJSON(d.controlInitialStaticValue, d.canvas.renderAll.bind(d.canvas));
            }
            else {
                d.canvas.clear();
            }
            d.sigLineStaticObject = new signatureLine();
            d.canvas.add(d.sigLineStaticObject);
            d.updateModel();
        }

        //
        // this is kind of a reverse binding experiment
        // bind the dummy variable function from the control
        // to the canvas deleteSelected function used internally in this handler
        // console.log(valueAccessor().canvas.deleteSelected);
        valueAccessor().canvas.deleteSelected = function () {
            var selected = d.canvas.getActiveObject();
            if (selected) {
                selected.remove();
            }

        }

        //
        // this funtion activates the bindings with fabric for this handler
        d.activateBinding = function () {
            // listen to the canvas for drawing updates
            ko.utils.arrayForEach(['mouse:down', 'mouse:up'],
                function (eventName) {
                    d.canvas.on(eventName, function (e) {
                        // console.log(eventName);
                        d.updateModel();
                    });
                });
            // automatically update the brush width & color of new drawings to the currently selected color
            ko.utils.arrayForEach(['object:added'],  //'path:created',
                function (eventName) {
                    d.canvas.on(eventName, function (e) {
                        if (e.target.type == 'path') {
                            var lastDrawing = e.target;
                            lastDrawing.set({
                                // the fill variable will literally fill in any circle you draw
                                // cool, but unintended consequences
                                // fill: d.brushColorObservable(),
                                stroke: d.brushColorObservable(),
                                strokeWidth: parseInt(d.brushWidthObservable())
                            });
                            // d.canvas.renderAll.bind(d.canvas);
                        }

                    });
                });
        }

        // listen to the canvas for drawing updates
        d.activateBinding();
        d.updateModel();

        return d;
    }
}