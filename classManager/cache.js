'use strict'
class CacheManager{
    constructor(){
        if(!CacheManager.instance){
            this._cache = []
            CacheManager.instance = this
        }
        return CacheManager.instance
    }
}
const instance = new CacheManager();
/*
Object.freeze로 싱글톤 패턴 클래스를 freeze.

Object.freeze로 객체를 동결. 동결된 객체에 속성 추가나 제거하는 동작이 불가 - immutable한 객체
prototype의 변경도 막아버림.

const + Object.freeze를 같이 사용하면 재할당도 불가능하게 동결시킬 수 있다. let으로 선언하면 재할당시
불변성을 지킬수는 없음...
 */
Object.freeze(instance);

export default CacheManager;