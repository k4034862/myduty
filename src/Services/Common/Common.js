import axios from "axios";
/** Services Import */
import Global from "./Global";
import IndexedDb from "../IndexedDb/IndexedDb";
import _ from "lodash";
import { useNavigate } from "react-router-dom";

const Commons = {
  // 현재 화면의 너비와 높이 반환 함수
  Dimentions: () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  },
  CustomHeaderRenderer: ({ value }) => {
    return (
      <div
        style={{
          color:
            value === "발주완료"
              ? "orange"
              : value === "입고진행중"
              ? "green"
              : value === "입고완료"
              ? "blue"
              : value === "주문완료"
              ? "orange"
              : value === "생산중"
              ? "green"
              : value === "생산완료"
              ? "blue"
              : value === "출하지시"
              ? "red"
              : value === "출하"
              ? "#F9D537"
              : value === "납품"
              ? "blue"
              : value < 0
              ? "red"
              : "",
        }}
      >
        {value}
      </div>
    );
  },
  CustomNumberRenderer: ({ value }) => {
    return (
      <div
        style={{
          color: value < 0 ? "red" : "",
        }}
      >
        {value
          ? value
              .toFixed(2)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
          : "0"}
      </div>
    );
  },
  CustomWhCdRenderer: ({ value }) => {
    return (
      <div
        style={{
          color:
            value === "[부산][입고][B][IN-warehouse]" ||
            value === "[부산][B][생산][Production]"
              ? "orange"
              : value === "[서울][입고][S][IN-warehouse]" ||
                value === "[서울][S][생산][Production]"
              ? "green"
              : value === "[베트남][입고][V][IN-warehouse]" ||
                value === "[베트남][V][생산][Production]"
              ? "blue"
              : value === "[중국][입고][C][入庫倉庫]" ||
                value === "[중국][생산]生產倉庫"
              ? "red"
              : "",
        }}
      >
        {value}
      </div>
    );
  },
  //사업장 색깔
  CustomPlantRenderer: ({ value }) => {
    return (
      <div
        style={{
          color:
            value === "부산(Busan)"
              ? "orange"
              : value === "서울(Seoul)"
              ? "green"
              : value === "베트남(Vietnam_"
              ? "blue"
              : value === "중국(China)"
              ? "red"
              : "",
        }}
      >
        {value}
      </div>
    );
  },
  //수불타입 색깔
  CustomTransTypeRenderer: ({ value }) => {
    return (
      <div
        style={{
          color:
            value === "생산"
              ? "green"
              : value === "재고이동(차감)"
              ? "red"
              : value === "재고이동(추가)"
              ? "green"
              : value === "생산취소"
              ? "red"
              : value === "출하"
              ? "red"
              : value === "출하취소"
              ? "green"
              : "",
        }}
      >
        {value}
      </div>
    );
  },
  // 발주수량 = > BOM 수량 (계산식)
  splitFun: (_poAddItemQty, _itemFormula) => {
    let ab = _poAddItemQty * 1;
    let c = "";
    let d = "";
    //숫자
    for (let i = 0; i < _itemFormula.length; i++) {
      if (i == _itemFormula.length - 1) {
        //마지막
        c = c + _itemFormula[i];
        if (d == "*") {
          ab = ab * parseFloat(c);
        } else if (d == "/") {
          ab = ab / parseFloat(c);
        } else if (d == "-") {
          ab = ab - parseFloat(c);
        } else if (d == "+") {
          ab = ab - parseFloat(c);
        } else {
          ab = ab * parseFloat(c);
        }
        d = _itemFormula[i];
        c = "";
      } else {
        if (isNaN(_itemFormula[i]) == false || _itemFormula[i] === ".") {
          //숫자면 string에 저장
          c = c + _itemFormula[i];
        } else {
          //기호면 총합(ab) 전에있던 기호 지금 숫자 연산
          if (d == "*") {
            ab = ab * parseFloat(c);
          } else if (d == "/") {
            ab = ab / parseFloat(c);
          } else if (d == "-") {
            ab = ab - parseFloat(c);
          } else if (d == "+") {
            ab = ab - parseFloat(c);
          } else {
            ab = ab * parseFloat(c);
          }
          d = _itemFormula[i];
          c = "";
        }
      }
    }
    return ab.toFixed(2) * 1;
  },
  //BOM = > 발주수량 (역순 계산식)
  splitReserveFun: (_poAddItemQty, _itemFormula) => {
    let ab = _poAddItemQty * 1;
    let c = "";
    let d = "";
    //숫자
    for (let i = 0; i < _itemFormula.length; i++) {
      if (i == _itemFormula.length - 1) {
        //마지막
        c = c + _itemFormula[i];
        if (d == "*") {
          ab = ab / parseFloat(c);
        } else if (d == "/") {
          ab = ab * parseFloat(c);
        } else if (d == "-") {
          ab = ab + parseFloat(c);
        } else if (d == "+") {
          ab = ab - parseFloat(c);
        } else {
          ab = ab / parseFloat(c);
        }
        d = _itemFormula[i];
        c = "";
      } else {
        if (isNaN(_itemFormula[i]) == false || _itemFormula[i] === ".") {
          //숫자면 string에 저장
          c = c + _itemFormula[i];
        } else {
          //기호면 총합(ab) 전에있던 기호 지금 숫자 연산
          if (d == "*") {
            ab = ab / parseFloat(c);
          } else if (d == "/") {
            ab = ab * parseFloat(c);
          } else if (d == "-") {
            ab = ab + parseFloat(c);
          } else if (d == "+") {
            ab = ab - parseFloat(c);
          } else {
            ab = ab / parseFloat(c);
          }
          d = _itemFormula[i];
          c = "";
        }
      }
    }
    return ab.toFixed(2) * 1;
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

  // Date 포멧을 바꾸는 function
  DateFormating: (_date, _type = 2) => {
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
  //날짜 문자열 바꾸기
  DateStrChange: (_date) => {
    if (_date === null || _date === undefined) {
      return null;
    }
    _date = new Date(_date);
    let year = _date.getFullYear();
    let month = _date.getMonth() + 1;
    let day = _date.getDate();
    let hour = _date.getHours();
    let minute = _date.getMinutes();
    let second = _date.getSeconds();
    return (
      year +
      "-" +
      month.toString().padStart(2, "0") +
      "-" +
      day.toString().padStart(2, "0") +
      "T" +
      hour.toString().padStart(2, "0") +
      ":" +
      minute.toString().padStart(2, "0") +
      ":" +
      second.toString().padStart(2, "0")
    );
  },
  // 두 날짜 사이의 차
  DateDiff: (_date1, _date2, _type = "D") => {
    const date1 = new Date(_date1);
    const date2 = new Date(_date2);
    const diffDate = date1.getTime() - date2.getTime();
    let returnDate = null;

    switch (_type) {
      case "H":
        returnDate = Math.abs(diffDate / (1000 * 60 * 60));
        break;
      case "D":
        returnDate = Math.abs(diffDate / (1000 * 60 * 60 * 24));
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
              (month + _num).toString().padStart(2, "0") +
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
              day.toString().padStart(2, "0") +
              " 23:59:59";
          }
        }
        break;
    }

    return result;
  },
  // 일자에서 계산 값을 리턴하는 함수
  DateCalcular1: (date, _num = 0, _code = "M") => {
    let today = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
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
              (month + _num).toString().padStart(2, "0") +
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
              day.toString().padStart(2, "0") +
              " 23:59:59";
          }
        }
        break;
      case "H":
        if (_num != 0) {
          if (_num < 0) {
            result =
              year +
              "-" +
              month.toString().padStart(2, "0") +
              "-" +
              day.toString().padStart(2, "0") +
              " " +
              hour.toString().padStart(2, "0") +
              ":00:00";
          } else {
            result =
              year +
              "-" +
              month.toString().padStart(2, "0") +
              "-" +
              day.toString().padStart(2, "0") +
              " " +
              (hour + _num).toString().padStart(2, "0") +
              ":59:59";
          }
        }
        break;
    }

    return result;
  },
  // 객체 배열 중복 제거
  // Deduplication: (_arr = [], _keys) => {
  //   return _.unionBy(_arr.reverse(), _keys);
  // },

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

  // 객체 배열 중복 제거1
  Deduplication1: (_arr = []) => {
    let uniqArr = _arr.filter((item, index) => {
      return _arr.indexOf(item) === index;
    });
    return uniqArr;
  },

  // 객체 배열 중복 제거
  Deduplication2: (_arr = []) => {
    let uniqArr = _arr.reduce((acc, current) => {
      const uniq = acc.find((item) => item.rowIdx === current.rowIdx);
      if (!uniq) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    return uniqArr;
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

  //Axios get/post response function
  Axios: async (_type = "get", _url, _params, _bodys = null) => {
    // const navigate = useNavigate(); // Route move api

    let token = null;
    let nowDate = new Date();
    let expiredTime = false;
    let userInfo = null;
    switch (_type) {
      case "get":
        await IndexedDb.GetLoginInfo().then((result) => {
          if (result === false) {
          }
          userInfo = result.userId;
          token = result.token;
        });
        await IndexedDb.GetAllDb("LoginInfo").then((result) => {
          if (result.length > 0) {
            if (new Date(result[0].expiredTime) < nowDate) {
              Commons.Storages("set", "authorization", {
                authorization: false,
                authDate: Commons.DateFormating(new Date()),
              });

              IndexedDb.ClearDb("LoginInfo");
              expiredTime = true;
            }
          }
        });
        if (expiredTime == true) {
          await Commons.Axios(
            "post",
            Global.serverUrls.useUrl + Global.urls.logic.Common.LogOut,
            {
              userId: userInfo,
            }
          ).then((result) => {
            // navigate("/");
            Commons.Storages("set", "authorization", {
              authorization: false,
              authDate: Commons.DateFormating(new Date()),
            });
            let data = result.data;
          });
        }
        return await axios.get(_url, {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + token,
          },
          params: _params,
        });
      case "post":
        await IndexedDb.GetLoginInfo().then((result) => {
          if (result === "already") {
          } else {
            token = result.token;
          }
        });
        if (_bodys === null) {
          _bodys = _params;
        }

        return await axios.post(_url, _bodys, {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + token,
          },
          params: _params,
        });
      case "post1":
        await IndexedDb.GetLoginInfo().then((result) => {
          token = result.token;
        });

        if (_bodys === null) {
          _bodys = _params;
        }

        return await axios.post(_url, _bodys, {
          headers: {
            "Content-Type": `application/json`,
            Authorization: "Bearer " + token,
          },
          params: !_bodys ? _params : "",
        });
      case "login":
        return await axios.post(_url, _params, {
          Headers: {
            headers: { "Content-Type": `application/json` },
          },
          body: _params,
        });
      case "logout":
        await IndexedDb.ClearDb("LoginInfo");
        await IndexedDb.ClearDb("LanguageList");
        await IndexedDb.ClearDb("MenuList");
    }
  },

  // Network check function
  CheckNetwork: async () => {
    return new Promise((resolve, reject) => {
      try {
        axios
          .post(Global.serverUrls.useUrl + Global.urls.CheckNetwork)
          .then((result) => {
            let data = result.data;
            if (data === "ok") {
              resolve("ok");
            } else {
              reject(new Error("Server network not checked."));
            }
          });
      } catch (e) {
        reject(new Error(e.response));
        // if (!e.request) {
        // 	return false;
        // } else if (e.request && !e.response) {
        // 	return false;
        // } else if (e.request && e.response.status == 401) {
        // 	return false;
        // } else if (e.request && e.response.status == 403) {
        // 	return false;
        // } else if (e.request && e.response.status == 404) {
        // 	return false;
        // }
      }
    });
  },
};

export default Commons;
