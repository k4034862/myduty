import axios from "axios";
/** Services Import */
import _ from "lodash";

const Commons = {
  // 현재 화면의 너비와 높이 반환 함수
  Dimentions: () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  },

  // 모바일인지 Check, mobile => true
  IsMobile: () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  },

  // String change function
  ChangeString: (_data, _type = "trim") => {
    if (_data.lenght < 1) {
      return "";
    }

    const data = _data.toString();

    switch (_type) {
      case "trim":
        return data.trim();
      case "lTrim":
        return data.trimStart();
      case "rTrim":
        return data.trimEnd();
      case "toInt":
        if (!parseInt(data)) {
          return 0;
        } else {
          return parseInt(data);
        }
      case "toFloat":
        if (!parseFloat(data)) {
          return 0;
        } else {
          return parseFloat(data);
        }
      case "upper":
        return data.toUpperCase();
      case "lower":
        return data.toLowerCase();
    }
  },

  // 숫자 타입 판별
  TypeOfNumber: (_numStr = "") => {
    let num = _numStr * 1;
    if (Number(num) === num && num % 1 === 0) {
      return "int";
    } else if (Number(num) === num && num % 1 !== 0) {
      return "float";
    } else {
      return false;
    }
  },

  // String을 Date로 바꾸는 function
  StringtoDate: (_date, _type = 1) => {
    let date = null;

    if (_date === null || _date === undefined || _date === "") {
      date = new Date();
    } else {
      date = _date;
    }

    switch (_type) {
      case 1:
        return new Date(
          date.substring(0, 4),
          date.substring(4, 6) - 1,
          date.substring(6, 8)
        );
      case 2:
        return new Date(
          date.getFullYear().toString(),
          (date.getMonth() + 1).toString(),
          date.getDate().toString()
        );
      case 3:
        return new Date(
          date.substring(0, 4),
          date.substring(4, 6) - 1,
          date.substring(6, 8),
          date.substring(8, 10),
          date.substring(10, 12),
          date.substring(12, 14)
        );
    }
  },

  // Date를 String으로 바꾸는 function
  DateToString: (_date, _type = 1) => {
    const data = new Date(_date);
    console.log(data);
    switch (_type) {
      case 1:
        return (
          data.getFullYear().toString().padStart(2, "0") +
          (data.getMonth() + 1).toString().padStart(2, "0") +
          data.getDate().toString().padStart(2, "0")
        ); // 20230101 (8자리)
      case 2:
        return (
          data.getFullYear().toString().padStart(2, "0") +
          (data.getMonth() + 1).toString().padStart(2, "0") +
          data.getDate().toString().padStart(2, "0") +
          data.getHours().toString().padStart(2, "0") +
          data.getMinutes().toString().padStart(2, "0") +
          data.getSeconds().toString().padStart(2, "0")
        ); // 20230101000000 (14자리)
      case 3:
        return (
          data.getFullYear().toString().padStart(2, "0") +
          (data.getMonth() + 1).toString().padStart(2, "0") +
          data.getDate().toString().padStart(2, "0") +
          data.getHours().toString().padStart(2, "0") +
          data.getMinutes().toString().padStart(2, "0") +
          data.getSeconds().toString().padStart(2, "0") +
          data.getMilliseconds().toString().padStart(3, 0)
        ); // 20230101000000000 (17자리)
      case 4:
        return (
          data.getFullYear().toString().slice(2, 4) +
          (data.getMonth() + 1).toString().padStart(2, "0") +
          data.getDate().toString().padStart(2, "0") +
          data.getHours().toString().padStart(2, "0") +
          data.getMinutes().toString().padStart(2, "0") +
          data.getSeconds().toString().padStart(2, "0") +
          data.getMilliseconds().toString().padStart(3, 0)
        ); // 230101000000000 (15자리)
    }
  },

  // Date 포멧을 바꾸는 function
  DateFormating: (_date, _type = 1) => {
    if (_date.length < 9) {
      return "";
    }

    const data = new Date(_date);
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let date = data.getDate();
    let hour = data.getHours();
    let min = data.getMinutes();
    let sec = data.getSeconds();

    switch (_type) {
      case 1:
        return (
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          date.toString().padStart(2, "0") +
          " " +
          hour.toString().padStart(2, "0") +
          ":" +
          min.toString().padStart(2, "0") +
          ":" +
          sec.toString().padStart(2, "0")
        );
      case 2:
        return (
          year +
          "-" +
          month.toString().padStart(2, "0") +
          "-" +
          date.toString().padStart(2, "0")
        );
      case 3:
        return (
          year +
          "/" +
          month.toString().padStart(2, "0") +
          "/" +
          date.toString().padStart(2, "0") +
          "/ " +
          hour.toString().padStart(2, "0") +
          ":" +
          min.toString().padStart(2, "0") +
          ":" +
          sec.toString().padStart(2, "0")
        );
      case 4:
        return (
          year +
          "/" +
          month.toString().padStart(2, "0") +
          "/" +
          date.toString().padStart(2, "0")
        );
      case 5:
        return (
          year.toString() +
          month.toString().padStart(2, "0") +
          date.toString().padStart(2, "0") +
          hour.toString().padStart(2, "0") +
          min.toString().padStart(2, "0") +
          sec.toString().padStart(2, "0")
        );
      case 6:
        return (
          year.toString() +
          month.toString().padStart(2, "0") +
          date.toString().padStart(2, "0")
        );
      case 7:
        return (
          hour.toString().padStart(2, "0") +
          min.toString().padStart(2, "0") +
          sec.toString().padStart(2, "0")
        );
    }
  },

  // 두 날짜 사이의 차
  DateDiff: (_date1, _date2, _type = "D") => {
    const date1 = new Date(_date1);
    const date2 = new Date(_date2);
    const diffDate = date1.getTime() - date2.getTime();
    let returnDate = null;

    switch (_type) {
      case "D":
        returnDate = Math.abs(diffDate / (1000 * 60 * 60 * 24));
        break;
      case "W":
        returnDate = Math.floor(Math.abs(diffDate / (1000 * 60 * 60 * 24 * 7)));
        break;
      case "M":
        returnDate = Math.floor(
          Math.abs(diffDate / (1000 * 60 * 60 * 24 * 30))
        );
        break;
      case "Y":
        returnDate = Math.floor(
          Math.abs(diffDate / (1000 * 60 * 60 * 24 * 365))
        );
        break;
    }
    return returnDate;
  },

  // 현재 일자에서 계산 값을 리턴하는 함수
  DateCalcular: (_num = 0, _code = "M") => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();
    let result;

    switch (_code) {
      case "Y":
        if (_num != 0) {
          if (_num < 0) {
            result =
              year +
              _num +
              "-" +
              month.toString().padStart(2, "0") +
              "-" +
              day.toString().padStart(2, "0") +
              " 00:00:00";
          } else {
            result =
              year +
              _num +
              "-" +
              month.toString().padStart(2, "0") +
              "-" +
              day.toString().padStart(2, "0") +
              " 23:59:59";
          }
        }
        break;
      case "M":
        if (_num != 0) {
          if (_num < 0) {
            result =
              year +
              "-" +
              (month + _num).toString().padStart(2, "0") +
              "-" +
              day.toString().padStart(2, "0") +
              " 00:00:00";
          } else {
            result =
              year +
              "-" +
              ((month + _num) % 12).toString().padStart(2, "0") +
              "-" +
              day.toString().padStart(2, "0") +
              " 23:59:59";
          }
        }
        break;
      case "D":
        if (_num != 0) {
          if (_num < 0) {
            result =
              year +
              "-" +
              month.toString().padStart(2, "0") +
              "-" +
              (day + _num).toString().padStart(2, "0") +
              " 00:00:00";
          } else {
            result =
              year +
              "-" +
              month.toString().padStart(2, "0") +
              "-" +
              (day + _num).toString().padStart(2, "0") +
              " 23:59:59";
          }
        }
        break;
    }

    return result;
  },

  // 객체 배열 중복 제거
  Deduplication: (_arr = []) => {
    let uniqArr = _arr.reverse().reduce((acc, current) => {
      const uniq = acc.find((item) => item.rowIdx === current.rowIdx);
      if (!uniq) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return uniqArr;
  },

  // 객체 배열 중복 제거2
  Deduplication: (_arr = [], _keys) => {
    return _.unionBy(_arr.reverse(), _keys);
  },

  // js document 선택 시 테두리 색 표시
  SelectionDocuments: (_itemClass, _idx, _arr = []) => {
    let itemElement = document.getElementsByClassName(_itemClass + _idx);
    if (itemElement.length !== 0) {
      // itemElement[0].style.backgroundColor = "#00afec";
      itemElement[0].style.border = "3px solid #00afec";
      _arr.forEach((item, index) => {
        if (index !== _idx) {
          let notItemElement = document.getElementsByClassName(
            _itemClass + index
          );
          // notItemElement[0].style.backgroundColor = "#fff";
          notItemElement[0].style.border = "0px";
        }
      });
    }
  },

  // Grid insert rows number
  InsertNumber: (_arr = []) => {
    let newArr = [];
    if (_arr.length > 0) {
      _arr.forEach((item, index) => {
        newArr.push({
          ...item,
          no: index + 1,
        });
      });

      return newArr;
    } else {
      return false;
    }
  },

  // Local Storage get/set/remove/clear return function
  Storages: (_type, _name, _data) => {
    switch (_type) {
      case "get":
        if (_name) {
          return JSON.parse(window.localStorage.getItem(_name));
        } else {
          return "error";
        }
      case "set":
        if (_name && _data) {
          window.localStorage.setItem(_name, JSON.stringify(_data));
          break;
        } else {
          return "error";
        }
      case "remove":
        if (_name) {
          window.localStorage.removeItem(_name);
          break;
        } else {
          return "error";
        }
      case "clear":
        window.localStorage.clear();
        break;
    }
  },
};

export default Commons;
