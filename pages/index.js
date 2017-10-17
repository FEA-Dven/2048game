'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: 'test'
    }, _this.data = {
      userInfo: {
        nickName: '加载中...'
      },
      mydata: new Array(16),
      slidetime: 20,
      direction: 0,
      startPos: {},
      gameover: {
        status: true,
        message: "你输了"
      }
    }, _this.computed = {
      now: function now() {
        return +new Date();
      }
    }, _this.methods = {
      start: function start(event) {
        var touch = event.touches[0]; //touches数组对象获得屏幕上所有的touch，取第一个touch
        this.startPos = { x: touch.pageX, y: touch.pageY, time: new Date() }; //取第一个touch的坐标值
        this.direction = 0;
      },
      move: function move(event) {
        //当屏幕有多个touch或者页面被缩放过，就不执行move操作
        if (event.touches.length > 1 || event.scale && event.scale !== 1) return;

        var time = new Date() - this.startPos.time;
        if (time >= this.slidetime && this.direction == 0) {
          var touch = event.touches[0];
          var x = touch.pageX - this.startPos.x;
          var y = touch.pageY - this.startPos.y;

          if (Math.abs(x) > Math.abs(y)) {
            //左右
            if (x > 0) {
              //右
              this.direction = 'right';
            } else {
              //左
              this.direction = 'left';
            }
          } else {
            //上下
            if (y > 0) {
              this.direction = 'down';
            } else {
              this.direction = 'up';
            }
          }
        }
      },
      end: function end(event) {
        var flag = this.gamveOver();
        if (flag == 1) {
          this.gameover = {
            status: false,
            message: '你是个天才!'
          };
        } else if (flag == -1) {
          this.gameover = {
            status: false,
            message: '你是个笨蛋!'
          };
        }

        if (this.direction == "left") {
          this.mergeMove(3, 2, 1, 0);
          this.mergeMove(7, 6, 5, 4);
          this.mergeMove(11, 10, 9, 8);
          this.mergeMove(15, 14, 13, 12);
        } else if (this.direction == "right") {
          this.mergeMove(0, 1, 2, 3);
          this.mergeMove(4, 5, 6, 7);
          this.mergeMove(8, 9, 10, 11);
          this.mergeMove(12, 13, 14, 15);
        } else if (this.direction == "down") {
          this.mergeMove(0, 4, 8, 12);
          this.mergeMove(1, 5, 9, 13);
          this.mergeMove(2, 6, 10, 14);
          this.mergeMove(3, 7, 11, 15);
        } else if (this.direction == "up") {
          this.mergeMove(12, 8, 4, 0);
          this.mergeMove(13, 9, 5, 1);
          this.mergeMove(14, 10, 6, 2);
          this.mergeMove(15, 11, 7, 3);
        }

        this.randNum();
        this.totalscore();
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      var self = this;
      this.mydata.fill(0);
      this.$parent.getUserInfo(function (userInfo) {
        if (userInfo) {
          self.userInfo = userInfo;
        }

        self.$apply();
      });
      this.randNum();
      this.randNum();
    }

    // 自定义函数

  }, {
    key: 'restart',
    value: function restart() {
      var arr = new Array(16);
      arr.fill(0);
      this.mydata = arr;
      this.gameover = {
        status: true
        //随机生成二个数字
      };this.randNum();
      this.randNum();
    }
  }, {
    key: 'randNum',
    value: function randNum() {
      var arr = [];

      this.mydata.map(function (item, i) {

        if (item == 0) {
          arr.push(i);
        }
      });
      var num = Math.random() > 0.7 ? 4 : 2;
      var index = arr[Math.floor(Math.random() * arr.length)];
      this.changeData(index, num);
    }
  }, {
    key: 'mergeMove',
    value: function mergeMove(d1, d2, d3, d4) {
      var arr = [d1, d2, d3, d4];
      //合并
      var pre, next;
      for (var i = arr.length - 1; i > 0; i--) {
        pre = this.mydata[arr[i]];
        if (pre == 0) {
          continue;
        }

        for (var j = i - 1; j >= 0; j--) {
          next = this.mydata[arr[j]];
          if (next == 0) {
            continue;
          } else if (pre != next) {
            break;
          } else {
            this.changeData(arr[i], next * 2);
            this.changeData(arr[j], 0);
            break;
          }
        }
      }

      //移位
      for (var i = arr.length - 1; i > 0; i--) {
        pre = this.mydata[arr[i]];
        if (pre == 0) {
          for (var j = i - 1; j >= 0; j--) {
            next = this.mydata[arr[j]];
            if (next == 0) {
              continue;
            } else {
              this.changeData(arr[i], next);
              this.changeData(arr[j], 0);
            }

            break;
          }
        }
      }
    }
  }, {
    key: 'changeData',
    value: function changeData(index, num) {
      this.mydata[index] = num;
    }
  }, {
    key: 'gamveOver',
    value: function gamveOver() {
      //格子满了
      var temp = [];
      var max = 0;
      for (var i = 0; i < this.mydata.length; i++) {
        if (this.mydata[i] == 0) {
          temp.push(i);
        }

        if (this.mydata[i] > max) {
          max = this.mydata[i];
        }
      }

      //有一个格子为2048
      if (max >= 2048) {
        return 1;
      }

      if (temp.length == 0) {
        //格子满的情况
        var up, down, left, right;
        for (var i = 0; i < this.mydata.length; i++) {
          up = i - 4;
          down = i + 4;
          left = i - 1;
          right = i + 1;

          if (up >= 0 && up < this.mydata.length && this.mydata[up] == this.mydata[i]) {
            return false;
          }
          if (down >= 0 && down < this.mydata.length && this.mydata[down] == this.mydata[i]) {
            return false;
          }

          if (i % 4 != 0 && left >= 0 && left < this.mydata.length && this.mydata[left] == this.mydata[i]) {
            return false;
          }
          if ((i + 1) % 4 != 0 && right >= 0 && right < this.mydata.length && this.mydata[right] == this.mydata[i]) {
            return false;
          }
        }

        return -1;
      }
    }
  }]);

  return Index;
}(_wepy2.default.page);


Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImRhdGEiLCJ1c2VySW5mbyIsIm5pY2tOYW1lIiwibXlkYXRhIiwiQXJyYXkiLCJzbGlkZXRpbWUiLCJkaXJlY3Rpb24iLCJzdGFydFBvcyIsImdhbWVvdmVyIiwic3RhdHVzIiwibWVzc2FnZSIsImNvbXB1dGVkIiwibm93IiwiRGF0ZSIsIm1ldGhvZHMiLCJzdGFydCIsImV2ZW50IiwidG91Y2giLCJ0b3VjaGVzIiwieCIsInBhZ2VYIiwieSIsInBhZ2VZIiwidGltZSIsIm1vdmUiLCJsZW5ndGgiLCJzY2FsZSIsIk1hdGgiLCJhYnMiLCJlbmQiLCJmbGFnIiwiZ2FtdmVPdmVyIiwibWVyZ2VNb3ZlIiwicmFuZE51bSIsInRvdGFsc2NvcmUiLCJzZWxmIiwiZmlsbCIsIiRwYXJlbnQiLCJnZXRVc2VySW5mbyIsIiRhcHBseSIsImFyciIsIm1hcCIsIml0ZW0iLCJpIiwicHVzaCIsIm51bSIsInJhbmRvbSIsImluZGV4IiwiZmxvb3IiLCJjaGFuZ2VEYXRhIiwiZDEiLCJkMiIsImQzIiwiZDQiLCJwcmUiLCJuZXh0IiwiaiIsInRlbXAiLCJtYXgiLCJ1cCIsImRvd24iLCJsZWZ0IiwicmlnaHQiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxLOzs7Ozs7Ozs7Ozs7OztvTEFDbkJDLE0sR0FBUztBQUNQQyw4QkFBd0I7QUFEakIsSyxRQUlUQyxJLEdBQU87QUFDTEMsZ0JBQVU7QUFDUkMsa0JBQVU7QUFERixPQURMO0FBSUxDLGNBQVMsSUFBSUMsS0FBSixDQUFVLEVBQVYsQ0FKSjtBQUtMQyxpQkFBWSxFQUxQO0FBTUxDLGlCQUFZLENBTlA7QUFPTEMsZ0JBQVcsRUFQTjtBQVFMQyxnQkFBVztBQUNUQyxnQkFBUyxJQURBO0FBRVRDLGlCQUFVO0FBRkQ7QUFSTixLLFFBY1BDLFEsR0FBVztBQUNU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O0FBQ0Q7QUFDRCxjQUFJaUIsUUFBUSxDQUFSLElBQWFBLE9BQU8sS0FBS3pELE1BQUwsQ0FBWXNCLE1BQWhDLElBQTBDLEtBQUt0QixNQUFMLENBQVl5RCxJQUFaLEtBQXFCLEtBQUt6RCxNQUFMLENBQVl3QyxDQUFaLENBQW5FLEVBQW9GO0FBQ2xGLG1CQUFPLEtBQVA7QUFDRDs7QUFFRCxjQUFJQSxJQUFJLENBQUosSUFBUyxDQUFULElBQWNrQixRQUFRLENBQXRCLElBQTJCQSxPQUFPLEtBQUsxRCxNQUFMLENBQVlzQixNQUE5QyxJQUF3RCxLQUFLdEIsTUFBTCxDQUFZMEQsSUFBWixLQUFxQixLQUFLMUQsTUFBTCxDQUFZd0MsQ0FBWixDQUFqRixFQUFrRztBQUNoRyxtQkFBTyxLQUFQO0FBQ0Q7QUFDRCxjQUFJLENBQUNBLElBQUksQ0FBTCxJQUFVLENBQVYsSUFBZSxDQUFmLElBQW9CbUIsU0FBUyxDQUE3QixJQUFrQ0EsUUFBUSxLQUFLM0QsTUFBTCxDQUFZc0IsTUFBdEQsSUFBZ0UsS0FBS3RCLE1BQUwsQ0FBWTJELEtBQVosS0FBc0IsS0FBSzNELE1BQUwsQ0FBWXdDLENBQVosQ0FBMUYsRUFBMkc7QUFDekcsbUJBQU8sS0FBUDtBQUNEO0FBQ0Y7O0FBRUQsZUFBTyxDQUFDLENBQVI7QUFDRDtBQUNGOzs7O0VBbE9rQyxlQUFLb0IsSTs7a0JBQW5CbEUsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgd2VweS5wYWdlIHtcclxuICAgIGNvbmZpZyA9IHtcclxuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ3Rlc3QnXHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgdXNlckluZm86IHtcclxuICAgICAgICBuaWNrTmFtZTogJ+WKoOi9veS4rS4uLidcclxuICAgICAgfSxcclxuICAgICAgbXlkYXRhIDogbmV3IEFycmF5KDE2KSxcclxuICAgICAgc2xpZGV0aW1lIDogMjAsXHJcbiAgICAgIGRpcmVjdGlvbiA6IDAsXHJcbiAgICAgIHN0YXJ0UG9zIDoge30sXHJcbiAgICAgIGdhbWVvdmVyIDoge1xyXG4gICAgICAgIHN0YXR1cyA6IHRydWUsXHJcbiAgICAgICAgbWVzc2FnZSA6IFwi5L2g6L6T5LqGXCJcclxuICAgICAgfSxcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgbm93ICgpIHtcclxuICAgICAgICByZXR1cm4gK25ldyBEYXRlKClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgc3RhcnQoZXZlbnQpe1xyXG4gICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdOyAvL3RvdWNoZXPmlbDnu4Tlr7nosaHojrflvpflsY/luZXkuIrmiYDmnInnmoR0b3VjaO+8jOWPluesrOS4gOS4qnRvdWNoXHJcbiAgICAgIHRoaXMuc3RhcnRQb3MgPSB7IHg6dG91Y2gucGFnZVgsIHk6dG91Y2gucGFnZVksIHRpbWU6bmV3IERhdGUoKSB9OyAvL+WPluesrOS4gOS4qnRvdWNo55qE5Z2Q5qCH5YC8XHJcbiAgICAgIHRoaXMuZGlyZWN0aW9uID0gMDtcclxuICAgICB9LFxyXG4gICAgIG1vdmUoZXZlbnQpe1xyXG4gICAgICAvL+W9k+Wxj+W5leacieWkmuS4qnRvdWNo5oiW6ICF6aG16Z2i6KKr57yp5pS+6L+H77yM5bCx5LiN5omn6KGMbW92ZeaTjeS9nFxyXG4gICAgICBpZihldmVudC50b3VjaGVzLmxlbmd0aCA+IDEgfHwgZXZlbnQuc2NhbGUgJiYgZXZlbnQuc2NhbGUgIT09IDEpIHJldHVybjtcclxuXHJcbiAgICAgIHZhciB0aW1lID0gbmV3IERhdGUoKSAtIHRoaXMuc3RhcnRQb3MudGltZTtcclxuICAgICAgaWYoIHRpbWUgPj0gdGhpcy5zbGlkZXRpbWUgJiYgdGhpcy5kaXJlY3Rpb24gPT0gMCApIHtcclxuICAgICAgICB2YXIgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIHZhciB4ID0gdG91Y2gucGFnZVggLSB0aGlzLnN0YXJ0UG9zLng7XHJcbiAgICAgICAgdmFyIHkgPSB0b3VjaC5wYWdlWSAtIHRoaXMuc3RhcnRQb3MueTtcclxuXHJcbiAgICAgICAgaWYoIE1hdGguYWJzKHgpID4gTWF0aC5hYnMoeSkgKSB7IC8v5bem5Y+zXHJcbiAgICAgICAgICBpZiggeCA+IDAgKSB7IC8v5Y+zXHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ3JpZ2h0JztcclxuICAgICAgICAgIH0gZWxzZSB7IC8v5bemXHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2xlZnQnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7IC8v5LiK5LiLXHJcbiAgICAgICAgICBpZiggeSA+IDAgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gJ2Rvd24nO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSAndXAnO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgIH0sXHJcbiAgICAgZW5kKGV2ZW50KXtcclxuICAgICAgdmFyIGZsYWcgPSB0aGlzLmdhbXZlT3ZlcigpO1xyXG4gICAgICBpZiggZmxhZyA9PSAxICkge1xyXG4gICAgICAgIHRoaXMuZ2FtZW92ZXIgPSB7XHJcbiAgICAgICAgICAgIHN0YXR1cyA6IGZhbHNlLFxyXG4gICAgICAgICAgICBtZXNzYWdlIDogJ+S9oOaYr+S4quWkqeaJjSEnXHJcbiAgICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSBpZiggZmxhZyA9PSAtMSApIHtcclxuICAgICAgICB0aGlzLmdhbWVvdmVyID0ge1xyXG4gICAgICAgICAgc3RhdHVzIDogZmFsc2UsXHJcbiAgICAgICAgICBtZXNzYWdlIDogJ+S9oOaYr+S4quesqOibiyEnXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiggdGhpcy5kaXJlY3Rpb24gPT0gXCJsZWZ0XCIgKSB7XHJcbiAgICAgICAgdGhpcy5tZXJnZU1vdmUoMywyLDEsMCk7XHJcbiAgICAgICAgdGhpcy5tZXJnZU1vdmUoNyw2LDUsNCk7XHJcbiAgICAgICAgdGhpcy5tZXJnZU1vdmUoMTEsMTAsOSw4KTtcclxuICAgICAgICB0aGlzLm1lcmdlTW92ZSgxNSwxNCwxMywxMik7XHJcbiAgICAgIH0gZWxzZSBpZiggdGhpcy5kaXJlY3Rpb24gPT0gXCJyaWdodFwiICkge1xyXG4gICAgICAgIHRoaXMubWVyZ2VNb3ZlKDAsMSwyLDMpO1xyXG4gICAgICAgIHRoaXMubWVyZ2VNb3ZlKDQsNSw2LDcpO1xyXG4gICAgICAgIHRoaXMubWVyZ2VNb3ZlKDgsOSwxMCwxMSk7XHJcbiAgICAgICAgdGhpcy5tZXJnZU1vdmUoMTIsMTMsMTQsMTUpO1xyXG4gICAgICB9IGVsc2UgaWYoIHRoaXMuZGlyZWN0aW9uID09IFwiZG93blwiICkge1xyXG4gICAgICAgIHRoaXMubWVyZ2VNb3ZlKDAsNCw4LDEyKTtcclxuICAgICAgICB0aGlzLm1lcmdlTW92ZSgxLDUsOSwxMyk7XHJcbiAgICAgICAgdGhpcy5tZXJnZU1vdmUoMiw2LDEwLDE0KTtcclxuICAgICAgICB0aGlzLm1lcmdlTW92ZSgzLDcsMTEsMTUpO1xyXG4gICAgICB9IGVsc2UgaWYoIHRoaXMuZGlyZWN0aW9uID09IFwidXBcIiApIHtcclxuICAgICAgICB0aGlzLm1lcmdlTW92ZSgxMiw4LDQsMCk7XHJcbiAgICAgICAgdGhpcy5tZXJnZU1vdmUoMTMsOSw1LDEpO1xyXG4gICAgICAgIHRoaXMubWVyZ2VNb3ZlKDE0LDEwLDYsMik7XHJcbiAgICAgICAgdGhpcy5tZXJnZU1vdmUoMTUsMTEsNywzKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5yYW5kTnVtKCk7XHJcbiAgICAgIHRoaXMudG90YWxzY29yZSgpO1xyXG4gICAgIH0sXHJcbiAgICAgXHJcbiAgICB9XHJcbiAgICBvbkxvYWQoKSB7XHJcbiAgICAgIGxldCBzZWxmID0gdGhpc1xyXG4gICAgICB0aGlzLm15ZGF0YS5maWxsKDApO1xyXG4gICAgICB0aGlzLiRwYXJlbnQuZ2V0VXNlckluZm8oZnVuY3Rpb24gKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgaWYgKHVzZXJJbmZvKSB7XHJcbiAgICAgICAgICBzZWxmLnVzZXJJbmZvID0gdXNlckluZm9cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNlbGYuJGFwcGx5KClcclxuICAgICAgfSlcclxuICAgICAgdGhpcy5yYW5kTnVtKCk7XHJcbiAgICAgIHRoaXMucmFuZE51bSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbi8vIOiHquWumuS5ieWHveaVsFxyXG4gIHJlc3RhcnQoKXtcclxuICAgIHZhciBhcnIgPSBuZXcgQXJyYXkoMTYpO1xyXG4gICAgYXJyLmZpbGwoMCk7XHJcbiAgICB0aGlzLm15ZGF0YSA9IGFyciBcclxuICAgIHRoaXMuZ2FtZW92ZXIgPSB7XHJcbiAgICAgIHN0YXR1cyA6IHRydWVcclxuICAgIH1cclxuICAgIC8v6ZqP5py655Sf5oiQ5LqM5Liq5pWw5a2XXHJcbiAgICB0aGlzLnJhbmROdW0oKTtcclxuICAgIHRoaXMucmFuZE51bSgpO1xyXG4gIH1cclxuICByYW5kTnVtKCl7XHJcbiAgICB2YXIgYXJyID0gW107XHJcbiAgICBcclxuICAgIHRoaXMubXlkYXRhLm1hcChmdW5jdGlvbihpdGVtLGkpe1xyXG5cclxuICAgICAgaWYoIGl0ZW0gPT0gMCApIHtcclxuICAgICAgICBhcnIucHVzaChpKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICB2YXIgbnVtID0gTWF0aC5yYW5kb20oKSA+IDAuNyA/IDQgOiAyO1xyXG4gICAgdmFyIGluZGV4ID0gYXJyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGFyci5sZW5ndGgpXTtcclxuICAgIHRoaXMuY2hhbmdlRGF0YShpbmRleCxudW0pO1xyXG4gIH1cclxuICBtZXJnZU1vdmUoZDEsZDIsZDMsZDQpe1xyXG4gICAgdmFyIGFyciA9IFtkMSxkMixkMyxkNF07XHJcbiAgICAvL+WQiOW5tlxyXG4gICAgdmFyIHByZSxuZXh0O1xyXG4gICAgZm9yKCB2YXIgaSA9IGFyci5sZW5ndGggLSAxO2kgPiAwO2ktLSApIHtcclxuICAgICAgcHJlID0gdGhpcy5teWRhdGFbIGFycltpXSBdO1xyXG4gICAgICBpZiggcHJlID09IDAgKSB7XHJcbiAgICAgICAgY29udGludWU7XHJcbiAgICAgIH1cclxuICAgICAgXHJcbiAgICAgIGZvciggdmFyIGogPSBpIC0gMTsgaiA+PSAwO2otLSApIHtcclxuICAgICAgICBuZXh0ID0gdGhpcy5teWRhdGFbIGFycltqXSBdO1xyXG4gICAgICAgIGlmKCBuZXh0ID09IDAgKSB7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9IGVsc2UgaWYoIHByZSAhPSBuZXh0ICkge1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuY2hhbmdlRGF0YSggYXJyWyBpXSAsbmV4dCAqIDIpO1xyXG4gICAgICAgICAgdGhpcy5jaGFuZ2VEYXRhKCBhcnJbal0gLDApO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy/np7vkvY1cclxuICAgIGZvciggdmFyIGkgPSBhcnIubGVuZ3RoIC0gMTtpID4gMDtpLS0gKSB7XHJcbiAgICAgIHByZSA9IHRoaXMubXlkYXRhWyBhcnJbaV0gXTtcclxuICAgICAgaWYoIHByZSA9PSAwICkge1xyXG4gICAgICAgIGZvciggdmFyIGogPSBpIC0gMTsgaiA+PSAwO2otLSApIHtcclxuICAgICAgICAgIG5leHQgPSB0aGlzLm15ZGF0YVsgYXJyW2pdIF07XHJcbiAgICAgICAgICBpZiggbmV4dCA9PSAwICkge1xyXG4gICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlRGF0YSggYXJyW2ldICxuZXh0KTtcclxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VEYXRhKCBhcnJbal0gLDApO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgXHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbiAgY2hhbmdlRGF0YSggaW5kZXgsbnVtICl7XHJcbiAgICB0aGlzLm15ZGF0YVtpbmRleF0gPSBudW1cclxuICB9XHJcbiAgZ2FtdmVPdmVyKCl7XHJcbiAgICAvL+agvOWtkOa7oeS6hlxyXG4gICAgdmFyIHRlbXAgPSBbXTtcclxuICAgIHZhciBtYXggPSAwO1xyXG4gICAgZm9yKCB2YXIgaSA9IDA7aSA8IHRoaXMubXlkYXRhLmxlbmd0aDtpKysgKSB7XHJcbiAgICAgIGlmKCB0aGlzLm15ZGF0YVtpXSA9PSAwICkge1xyXG4gICAgICAgIHRlbXAucHVzaCggaSApO1xyXG4gICAgICB9XHJcbiAgICAgIFxyXG4gICAgICBpZiggdGhpcy5teWRhdGFbaV0gPiBtYXggKSB7XHJcbiAgICAgICAgbWF4ID0gdGhpcy5teWRhdGFbaV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICAgLy/mnInkuIDkuKrmoLzlrZDkuLoyMDQ4XHJcbiAgICBpZiggbWF4ID49IDIwNDggKSB7XHJcbiAgICAgIHJldHVybiAxO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBpZiggdGVtcC5sZW5ndGggPT0gMCApeyAvL+agvOWtkOa7oeeahOaDheWGtVxyXG4gICAgICB2YXIgdXAsZG93bixsZWZ0LHJpZ2h0O1xyXG4gICAgICBmb3IoIHZhciBpID0gMDtpIDwgdGhpcy5teWRhdGEubGVuZ3RoO2krKyApIHtcclxuICAgICAgICB1cCA9IGkgLSA0O1xyXG4gICAgICAgIGRvd24gPSBpICsgNDtcclxuICAgICAgICBsZWZ0ID0gaSAtIDE7XHJcbiAgICAgICAgcmlnaHQgPSBpICsgMTtcclxuICAgICAgICBcclxuICAgICAgICBpZiggdXAgPj0gMCAmJiB1cCA8IHRoaXMubXlkYXRhLmxlbmd0aCAmJiB0aGlzLm15ZGF0YVt1cF0gPT0gdGhpcy5teWRhdGFbaV0gKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCBkb3duID49IDAgJiYgZG93biA8IHRoaXMubXlkYXRhLmxlbmd0aCAmJiB0aGlzLm15ZGF0YVtkb3duXSA9PSB0aGlzLm15ZGF0YVtpXSApIHtcclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICAgICAgaWYoIGkgJSA0ICE9IDAgJiYgbGVmdCA+PSAwICYmIGxlZnQgPCB0aGlzLm15ZGF0YS5sZW5ndGggJiYgdGhpcy5teWRhdGFbbGVmdF0gPT0gdGhpcy5teWRhdGFbaV0gKSB7XHJcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCAoaSArIDEpICUgNCAhPSAwICYmIHJpZ2h0ID49IDAgJiYgcmlnaHQgPCB0aGlzLm15ZGF0YS5sZW5ndGggJiYgdGhpcy5teWRhdGFbcmlnaHRdID09IHRoaXMubXlkYXRhW2ldICkge1xyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBcclxuICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iXX0=