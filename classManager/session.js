"use strict";
import CacheManager from "./cache";

class SessionManager extends CacheManager {}

const sessionManager = new SessionManager();
sessionManager.addConfig({
  token: "ex123k",
});

// 기존 cacheManager의 생성자, 메소드 (게터 ,세터) 등 모두 받아와서 사용가능. 기존의 활용된
// 모듈들의 기능을 재선언 하지않고 가져와 사용!
console.log(sessionManager.getConfig());


export default SessionManager;
