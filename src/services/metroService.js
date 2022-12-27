let getMetroInfo = async (currentStation) => {
  let reqInfoApi = await fetch(
    `http://swopenapi.seoul.go.kr/api/subway/26675694c6d617338346f67536346/json/realtimeStationArrival/0/30/${currentStation}`,
    {
      method: "get",
    }
  );
  let result = await reqInfoApi.json();

  if (!result.errorMessage) {
    const err = new Error("PLEASE_CHECK_STAION_NAME");
    err.statusCode = 400;
    throw err;
  } else {
    let A = await result.realtimeArrivalList;

    for (i in A) {
      if (A[i].subwayId == "1001") {
        A[i].subwayId == "1호선";
      } else if (A[i].subwayId == "1002") {
        A[i].subwayId = "2호선";
      } else if (A[i].subwayId == "1003") {
        A[i].subwayId = "3호선";
      } else if (A[i].subwayId == "1004") {
        A[i].subwayId = "4호선";
      } else if (A[i].subwayId == "1005") {
        A[i].subwayId = "5호선";
      } else if (A[i].subwayId == "1006") {
        A[i].subwayId = "6호선";
      } else if (A[i].subwayId == "1007") {
        A[i].subwayId = "7호선";
      } else if (A[i].subwayId == "1008") {
        A[i].subwayId = "8호선";
      } else if (A[i].subwayId == "1009") {
        A[i].subwayId = "9호선";
      } else if (A[i].subwayId == "1075") {
        A[i].subwayId = "분당선";
      } else if (A[i].subwayId == "1077") {
        A[i].subwayId = "신분당선";
      } else if (A[i].subwayId == "1091") {
        A[i].subwayId = "자기부상선";
      } else if (A[i].subwayId == "1092") {
        A[i].subwayId = "우이신설선";
      } else if (A[i].subwayId == "1163") {
        A[i].subwayId = "경의중앙선";
      } else if (A[i].subwayId == "1165") {
        A[i].subwayId = "공항철도선";
      } else if (A[i].subwayId == "1167") {
        A[i].subwayId = "경춘선";
      }
    }

    let up = [];
    let down = [];
    let outline = [];
    let inline = [];

    for (i in A) {
      if (A[i].updnLine == "상행") {
        up.push(A[i]);
      }
      if (A[i].updnLine == "하행") {
        down.push(A[i]);
      }
      if (A[i].updnLine == "외선") {
        outline.push(A[i]);
      }
      if (A[i].updnLine == "내선") {
        inline.push(A[i]);
      }
    }
    let info = `<${up[0].recptnDt} 기준>

가장빠른 >
      `;
    if (up.length > 0) {
      info += `
${up[0].subwayId}(${up[0].updnLine})이 ${up[0].barvlDt}초 후 도착예정 (${up[0].arvlMsg2})`;
    }
    if (down.length > 0) {
      info += `
${down[0].subwayId}(${down[0].updnLine})이 ${down[0].barvlDt}초 후 도착예정 (${down[0].arvlMsg2})`;
    }
    if (outline.length > 0) {
      info += `
${outline[0].subwayId}(${outline[0].updnLine})이 ${outline[0].barvlDt}초 후 도착예정 (${outline[0].arvlMsg2})`;
    }
    if (inline.length > 0) {
      info += `
${inline[0].subwayId}(${inline[0].updnLine})이 ${inline[0].barvlDt}초 후 도착예정 (${inline[0].arvlMsg2})`;
    }
    info += `

그다음은 >
      `;
    if (up.length > 1) {
      info += `
${up[1].subwayId}(${up[1].updnLine})이 ${up[1].barvlDt}초 후 도착예정 (${up[1].arvlMsg2})`;
    }
    if (down.length > 1) {
      info += `
${down[1].subwayId}(${down[1].updnLine})이 ${down[1].barvlDt}초 후 도착예정 (${down[1].arvlMsg2})`;
    }
    if (outline.length > 1) {
      info += `
${outline[1].subwayId}(${outline[1].updnLine})이 ${outline[1].barvlDt}초 후 도착예정 (${outline[1].arvlMsg2})`;
    }
    if (inline.length > 1) {
      info += `
${inline[1].subwayId}(${inline[1].updnLine})이 ${inline[1].barvlDt}초 후 도착예정 (${inline[1].arvlMsg2})`;
    }
    
    return info;
  }
};

module.exports = { getMetroInfo };
