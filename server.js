"use strict";

import express from "express";
import http from "http";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import serveStatic from 'serve-static';
/**
 *  class 패턴으로 개발하는 이유?
 *  $ 싱글톤 패턴 구조.
 *
 *  http노드 모듈의 Server를 extends
 *  constructor로 class초기화 - config로 환경설정 동적으로 세팅 : aws의 세팅이던 외부 환경설정
 *                              세팅을 넣어주기만 하면 됨.
 *
 *  super로 해당하는 메소드 모두 사용 가능.
 *  this.config => config로 환경설정 받음.
 *  this.app => app이 express로써 다른 express 메소드를 사용할 수 있게 받음.
 *  this.currentConns => 분산된 msa에서 어떻게 커넥션 관리하는 지 현재 연결된 분산된 환경의 커넥션을 set으로.
 *  this.busy  => CI/CD 환경에서 사용중인 커넥션을 관리하기 위해 연결된 상태를 관리
 *  this.stopping => 해당하는 서버가 배포 과정 중 중단되어지는 과정인가
 * 
 */
class ApiServer extends http.Server {
  constructor(config) {
    const app = express();
    super(app);
    this.app.static = serveStatic
    this.config = config;
    this.app = app;

    this.currentConns = new Set();
    this.busy = new WeakSet();
    this.stopping = false;
  }

  async start() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(bodyParser());

    this.app.use(this.app.static(path.join(__dirname, 'dist'), {
        setHeader: (res ,path) =>{
            // 어디서든 접근하든 허용
            
            // 모든 사용자에게 제공할 수 있도록 콜수 세팅. 특정 
            res.setHeader('Access-Control-Allow-Origin' , '*')

            // 헤더에 대한 조건 없이 , request에 종류에 상관없이 허용
            res.setHeader('Access-Control-Allow-Headers' , '*')

            // 메소드 지정. 정적파일은 사용자는 읽기만하면 되서 GET으로 세팅
            res.setHeader('Access-Control-Allow-Methods' , 'GET')
            
            
        }
    }))
  }
}

const init = async (config = {}) => {
  const server = new ApiServer(config);
  return server.start();
};
