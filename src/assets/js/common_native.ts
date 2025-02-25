import { GLog, DataSet, APP_ENV, AppEnvType } from '@assets/js/common';
import { messageView } from '@src/components/alert';
import { progressBar } from '@src/components/loading';

//Data Type : 네이티브 데이터 전송 폼
export type MessageSet = {
  callback: string;   //콜백함수
  cmd: string;   // 인터페이스 ID
  param: DataSet;   //데이터
};


export const NativeUtil = (() => {

  // _bridgeCallBack 객체를 각 cmd에 해당하는 콜백 함수를 저장할 수 있도록 선언합니다.
  const _bridgeCallBack: { [cmd: string]: (result: DataSet) => void } = {};

  /** [공통] 앱 환경인지 조회 */
  const _isApp = (): boolean => {
    
    if (APP_ENV == AppEnvType.LOCAL) {
      return false;
    }
    
    if (typeof (window as any)?.webkit?.messageHandlers?.gnb === 'object' ||
      typeof (window as any)?.gnb === 'object') {
      return true;
    } else {
      return false;
    }
  };

  /** [공통]  네이티브 전송 메세지 생성  */
  const makeMessage = (
    callback: string, // 네이티브 통신 후 실행할 콜백 함수 이름
    cmd: string,      // 네이티브 호출할 인터페이스 함수 이름
    param: DataSet
  ): MessageSet => {
    return { callback, cmd, param };  //메세지 생성성
  };

  /** [공통]  네이티브 함수 호출  */
  const nativeCall = (message: MessageSet): Promise<DataSet> => {
    return new Promise((resolve, reject) => {
      // 네이티브 응답을 받을 콜백을 _bridgeCallBack에 저장
      _bridgeCallBack[message.cmd] = (result: DataSet) => {
        resolve(result);
      };
      try {
        if (typeof (window as any)?.webkit?.messageHandlers?.gnb === 'object') {
          (window as any)?.webkit?.messageHandlers?.gnb.postMessage(JSON.stringify(message.param));
        }
        else if (typeof (window as any)?.gnb === 'object') {
          (window as any)?.gnb[message.cmd](JSON.stringify(message));
        }
      } catch (e) {
        GLog.e('Native 통신 에러 : ', e);
        reject(new Error('네이티브 인터페이스를 찾을 수 없습니다.'));
      }
    });
  };

  // //네이티브 통신


  /** [공통]  앱종료  */
  const _appClose = () => {
    if (_isApp()) {

      //1. 파라미터 셋팅
      const message = makeMessage('NativeUtil.bridgeCallBack', 'appClose', {});

      //2. 네이티브 통신
      nativeCall(message);

      //앱종료기때문에 이후 로직 필요 없음

    } else {
      messageView("앱에서만 가능합니다.");
    }
  };


  /**[공통] 디바이스 물리 뒤로가기 버튼  */
	const _fnBackBtn = function(){
		GLog.d('뒤로가기');
    progressBar(true);
    setTimeout(() => {
      window.history.back(); // 브라우저의 이전 페이지로 이동
      progressBar(false);
    }, 300);
	};

  /** [1] 디바이스 정보 조회  */
  const _getDeviceInfo = async (): Promise<DataSet> => {
    if (_isApp()) {
      //1. 파라미터 셋팅
      const message = makeMessage('NativeUtil.bridgeCallBack', 'getDeviceInfo', {});

      //2. 네이티브 통신
      const result = await nativeCall(message);

      //3. 전달
      return result;
    }
    else {
      //로컬값 셋팅
      return {
        'APPLICATION_ID': 'com.gnbsoftec.dolphinnative',
        'BUILD_TYPE': '',
        'VERSION_CODE': '1.0.0',
        'VERSION_NAME': '1',
        'SIM_STATE': 'local',
        'NET_OPERATOR': 'local',
        'PHONE_NUMBER': '',
        'PUSH_KEY': 'local'
      }
    }
  };

  /**[공통] 앱이 포어그라운드로 전환후 호출하는 웹 함수  */
  const _fnForeGround = (): void => {
    GLog.d("앱 포어그라운드로 올라옴");
  }

	/**[공통] 앱이 백그라운드로 내려가기전 호출하는 웹 함수  */
  const _fnBackGround = (): void => {
    GLog.d("앱 백그라운드로 내려감");
  }

  /**[공통] 앱이 포어그라운드 상태일때 푸쉬알림 수신시 호출하는 웹함수  */
	var _fnPushLink = (): void => {
    GLog.d("앱 백그라운드로 내려감");
  }
  // 필요한 다른 함수나 변수들도 여기에 추가할 수 있습니다.

  return {
    bridgeCallBack: _bridgeCallBack			//[공통]네이티브 처리후 콜백함수 저장소 
    , isApp: _isApp					//[공통]네이티브 앱인지 판단
    
		,appClose 						: _appClose 					//[공통]앱종료
		,fnBackGround 				: _fnBackGround 			//[공통]앱이 백그라운드로 내려가기전 호출하는 웹 함수
		,fnForeGround 				: _fnForeGround 			//[공통]앱이 포어그라운드로 전환후 호출하는 웹 함수
		,fnPushLink 					: _fnPushLink 				//[공통]앱이 포어그라운드 상태일때 푸쉬알림 수신시 호출하는 웹함수
		,fnBackBtn 					  : _fnBackBtn 				  //[공통]디바이스 물리 뒤로가기 버튼
		
		,getDeviceInfo 				: _getDeviceInfo 			//[1]디바이스 정보 얻어오기(버전정보,휴대폰번호,푸쉬키)
		// ,loading 						  : _loading 						//[2]로딩
		// ,setAppdata 					: _setAppdata 				//[3]내부저장소 등록
		// ,getAppdata 					: _getAppdata 				//[4]내부저장소 조회
		// ,getGalleryImage 			: _getGalleryImage 		//[5]갤러리 이미지 조회
		// ,getCameraImage 		  : _getCameraImage 		//[6]카메라 촬영후 이미지 조회
		// ,urlFileDownload 			: _urlFileDownload 		//[7]파일 다운로드 (URL)
		// ,base64FileDownload 	: _base64FileDownload //[8]파일 다운로드 (Base64)
		// ,permissionSelect 		: _permissionSelect 	//[9]퍼미션 상태체크
		// ,permissionCheck 			: _permissionCheck 		//[10]퍼미션 체크
		// ,showToast 					  : _showToast 				  //[11]커스텀토스트 메세지 출력
		// ,showNotification 		: _showNotification		//[12]알림 메세지 출력
		// ,pushList 						: _pushList					  //[13]푸쉬 리스트 조회
		// ,pushDelete 					: _pushDelete				  //[14]푸쉬 리스트 제거
		// ,pushTopicUpdate 			: _pushTopicUpdate		//[15]푸쉬 그룹 변경		
		// ,capture 						  : _capture						//[16]캡처하기
  };
})();

export default NativeUtil;


NativeUtil.fnBackGround