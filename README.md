# Express api 구조화

## overview
node.js로 웹 백엔드 개발을 하다보면 express를 많은 조직에서 사용하는 모습을 보게 됨.<br/>
express가 기본적으로 프레임워크로 제공해주는 기능이 많고 조금 헤비?(스프링에 비하면 헤비하다고 볼 수도 없을 거 같지만)하게 느낄수도 있지만 빠르게 빌드 업해야할 서비스에서 사용하는 건 좋은 방향성이라고 생각합니다.

이전에 koa + graphql 조합으로 개발한 적이 있는데 express에 비해 제공되는 게 없고 필요한 koa 모듈을 다 <br> 가져다 써야해서 자유도가 높은 대신에 사이즈는 가볍다고 생각합니다. 대신 아키텍쳐를 다지는 데 많은 고민?을 
해야하 지 않을까 싶고 어떤 모듈이 필요한 지 계속 찾아서 써야하는 부분은 약간 힘들?수도 있지 않을까 싶습니다.

## express 아키텍쳐?
### 싱글톤 패턴
보통 express app을 class의 생성자에서 생성하지 않았는데, <br>
데이터의 무결성 때문. class에서 한 번만 되기 때문에 MSA의 분산된 처리된 환경에서 클래스로써 <br />express를 선언하면 constructor에서 한 번만 생성되기 때문에 유일성을 보장 받는다!

/server.js 
```
// app의 시작점.

class ApiServer extends http.Server{
    constructor(config){
        const app = express()
    }
}

```


## middleware
사용할 미들웨어 
 - body-parser : 기본적으로 request 받을 때 json , raw , text일 수 있어서 express가 제공하진 않아서 미들웨어를 추가해서 사용해야 함.
 - cookie-parser : 쿠기에 대한 파싱해주는 미들웨어
 - helmet : express에 보안설정을 최적화 해주는 모듈.


## 커스텀 middleware

```
  async start() {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(cookieParser());
    this.app.use(bodyParser());

    // 커스텀  middleware 함수(내가 만드는 middleware)
    this.app.use(( err ,req , res , next ) => {
        // err 없으면 undefined , next는 해당 미들웨어 처리되서 다음 미들웨어로 넘어가는 분기 처리.
        if(err){
            console.error('Internal error ' , err);
        }
        if(req){
            console.log('req!' ,req)
        } 
        if(res){
            console.log('res!', res);
        }
        //해당 미들웨어에서 체킹할 부분은 끝났으니, 다음 미들웨어로 넘기자
        next();
    })
  }
```
### Express static 파일 처리
 - cors 이슈 [참고](https://www.zerocho.com/category/HTTP/post/5b4c4e3efc5052001b4f519b)


### REST API 

- rest api 특징으로 end-point 정의

https:test.com/user  [POST] <br />
https:test.com/user  [PUT] <br />
https:test.com/user  [DELETE] <br />
https:test.com/user  [PATCH] <br />

위의 user에 대한 end-point에 대해  <br />
POST로 유저 생성 <br />
PUT으로 유저 정보 업데이트 <br />
DELETE로 유저 삭제 <br />
PATCH로 유저에 대한 새로운 사항 변경 <br />


- REST API에 대한 잘못된 관점<br />
action은 POST PUT같은 메소드로 정의하고, end-point로 명시하는 방법은 옳지 못하다.end-point는 그대로 유지. 아래 end-point는 잘못된 예시.


https:test.com/user/create  [POST] <br />
https:test.com/user/update  [PUT]<br />
https:test.com/user/delete  [DELETE]<br />
https:test.com/user/patch  [PATCH]<br />




### Set과 WeakSet
 *  Set
   : 중복을 허용하지 않고 유일한 값만 저장. 
  
 *  WeakSet
  : 참조를 가지고 있는 객체만 저장이 가능하다. 이 객체들은 가비치 콜렉션의 대상이 됨.

  ```
    let arr = [1,2,3,4];
    let ws = new WeakSet();

    ws.add(arr);
    ws.add(111);
    ws.add("111");
    console


  ```


### Express Caching을 위한 redis를 이용한 Caching layers 설계

