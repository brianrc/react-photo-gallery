(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Gallery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactImages = require('react-images');

var _reactImages2 = _interopRequireDefault(_reactImages);

var Gallery = _react2['default'].createClass({
    displayName: 'Gallery',
    propTypes: {
        photos: _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.shape({
            gallery_src: _react2['default'].PropTypes.string.isRequired,
            src: _react2['default'].PropTypes.string.isRequired,
            srcset: _react2['default'].PropTypes.array,
            width: _react2['default'].PropTypes.number.isRequired,
            height: _react2['default'].PropTypes.number.isRequired,
            aspect_ratio: _react2['default'].PropTypes.number.isRequired
        })).isRequired
    },
    getInitialState: function getInitialState() {
        return {
            currentImage: 0,
            containerWidth: 0
        };
    },
    componentDidMount: function componentDidMount() {
        // add 15 pixels bc for unknown reason the clientWidth here is larger than what it really is
        this.setState({ containerWidth: _reactDom2['default'].findDOMNode(this).clientWidth - 15 });
        window.addEventListener('resize', this.handleResize);
    },
    handleResize: function handleResize(e) {
        this.setState({ containerWidth: _reactDom2['default'].findDOMNode(this).clientWidth });
    },
    openLightbox: function openLightbox(index, event) {
        event.preventDefault();
        this.setState({
            currentImage: index,
            lightboxIsOpen: true
        });
    },
    closeLightbox: function closeLightbox() {
        this.setState({
            currentImage: 0,
            lightboxIsOpen: false
        });
    },
    gotoPrevious: function gotoPrevious() {
        this.setState({
            currentImage: this.state.currentImage - 1
        });
    },
    gotoNext: function gotoNext() {
        this.setState({
            currentImage: this.state.currentImage + 1
        });
    },
    render: function render() {
        var rowLimit = 1,
            contWidth = this.state.containerWidth - rowLimit * 4,
            /* 4px for margin around each image*/
        photoPreviewNodes = [];
        if (this.state.containerWidth >= 480) {
            rowLimit = 2;
            contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
        }
        if (this.state.containerWidth >= 1024) {
            rowLimit = 3;
            contWidth = this.state.containerWidth - rowLimit * 4; /* 4px for margin around each image*/
        }
        contWidth = Math.ceil(contWidth - 2); // subtract a couple pixels for unknown issue where line breaks in certain breakpoints.  this gives container some "padding"
        for (var i = 0; i < this.props.photos.length; i += rowLimit) {
            var rowItems = [];
            // loop thru each set of rowLimit num
            // eg. if rowLimit is 3 it will  loop thru 0,1,2, then 3,4,5 to perform calculations for the particular set
            var aspect_ratio = 0,
                totalAr = 0,
                commonHeight = 0;
            for (var j = i; j < i + rowLimit; j++) {
                if (j == this.props.photos.length) {
                    break;
                }
                totalAr += this.props.photos[j].aspect_ratio;
            }
            commonHeight = contWidth / totalAr;
            // run thru the same set of items again to give the common height
            for (var k = i; k < i + rowLimit; k++) {
                if (k == this.props.photos.length) {
                    break;
                }
                var src = this.props.photos[k].gallery_src;
                photoPreviewNodes.push(_react2['default'].createElement(
                    'div',
                    { key: k, style: style },
                    _react2['default'].createElement(
                        'a',
                        { href: '#', className: k, onClick: this.openLightbox.bind(this, k) },
                        _react2['default'].createElement('img', { src: src, style: { display: 'block', border: 0 }, height: commonHeight, width: commonHeight * this.props.photos[k].aspect_ratio, alt: '' })
                    )
                ));
            }
        }
        return _react2['default'].createElement(
            'div',
            { id: 'Gallery', className: 'clearfix' },
            photoPreviewNodes,
            _react2['default'].createElement(_reactImages2['default'], {
                currentImage: this.state.currentImage,
                images: this.props.photos,
                isOpen: this.state.lightboxIsOpen,
                onClose: this.closeLightbox,
                onClickPrev: this.gotoPrevious,
                onClickNext: this.gotoNext,
                width: 1600,
                height: 1600,
                styles: this.props.lightboxStyles
            })
        );
    }
});
// Gallery image style
var style = {
    display: 'block',
    margin: 2,
    backgroundColor: '#e3e3e3',
    float: 'left'
};

module.exports = Gallery;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"react-dom":undefined,"react-images":undefined}]},{},[1])(1)
});