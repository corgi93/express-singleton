'use strict'
/**
 * redis 모듈을 사용해서 캐싱처리를 도와보자!
 * cloud상에서 분산처리 된 MSA 기반으로 cluster bean도 활용해야해서 redis-cluster도 설치 
 * 
 */
import redisCluster from 'redis-cluster';
import redisClient from 'redis';

let redis ,redisSub // redisSubscriber
let subCallbacks = new Map()

async function getRedisClient(sub){
    
}