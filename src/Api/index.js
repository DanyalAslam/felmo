import {getStoredState} from 'redux-persist';
import {persistConfig} from './../redux/index';
import config from './Config';
import {store} from '../redux/index';
import axios from 'axios'

const _getErrorMessage = (data) => {
  console.log('_getErrorMessage ', data);
  if (data.hasOwnProperty('errors')) {
    console.log('in iffff');
    const _keys = Object.keys(data.errors);
    const _message = data.errors[_keys[0]];
    return _message[0];
  }

  if (data.hasOwnProperty('message')) {
    if (typeof data.message == 'object') {
      const _keys = Object.keys(data.message);
      console.log('_keys', _keys);
      const _message = data.message[_keys];
      console.log('_message', _message);
      return _message;
    } else {
      return data.message;
    }
  } else if (data.hasOwnProperty('password')) {
    return data.password[0];
  }

  // else {
  //     console.log('in else',data.message);
  //     return data.message[0]
  // }
};

const Api = {



   loginPost : async  (endPoint, credentials, success, error, formdata = false) =>{

    console.log('endPoint', endPoint);
    console.log('credentials', credentials);

    axios({
      "method": "POST", // ye to dkeh saale.. ab chalaa
      "url": "http://unibro.com.pk/UBI-APP/loginApi.php",
      "headers": {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        // "x-rapidapi-key": process.env.REACT_APP_API_KEY
      }, 
      data: undefined,

        "params" :credentials
    
      
    })
      .then(async(response) => {

        console.log("login response",response)

        const setItm = {
          data:response.data.status,
          mess:response.data.message,
          session_id:response.data.sessionid,
          user_code:response.data.user_code,
          apcontrol:response.data.apcontrol,
        }
        console.log('result:', setItm.data)// is me kuch nh ara
        if(setItm.data === true){

          return success(setItm)
        }
  
        else if(setItm.data === false){
          return error(setItm.mess)
        }
        
        // setResponseData(response.data)//challa
        // console.warn(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  
},




//new Post method
  post: (endPoint, credentials, success, error, formdata = false) => {
    console.log('endPoint', endPoint);
    console.log('credentials', credentials);
    getStoredState(persistConfig).then((_state) => {
      let url = config.url + endPoint;


      let headers = {
        "Content-Type" : "application/octet-stream",
        "x-rapidapi-host":"quotes15.p.rapidapi.com",
  
        Accept: 'application/json',
      };
  
      // if (_state) {
      //   if (_state.GeneralReducer.access_token != null) {
      //     headers['Authorization'] =
      //       'Bearer ' + _state.GeneralReducer.access_token;
      //   }
      // }
  
      console.log('url  ', url, '  ', _state);
      let dataToSend = JSON.stringify(credentials);
  

      let requestConfig = {
        method: 'POST',
        headers: new Headers(headers),
        // params:credentials
        params:  dataToSend,
        // "params":{
        //   "user_name":"en",
        //   "user_hcode":"adsasdasd",
        // }
      };



      // let headers = {
      //   'Content-Type':
      //     formdata == true ? 'multipart/form-data' : 'application/json',
      //   Accept: 'application/json',
      // };

      // if (_state.GeneralReducer.access_token != null) {
      //   headers['Authorization'] =
      //     'Bearer ' + _state.GeneralReducer.access_token;
      // }

      // let dataToSend = JSON.stringify(credentials);

      // let requestConfig = {
      //   method: 'POST',
      //   headers: new Headers(headers),
      //   body: formdata ? credentials : dataToSend,
      // };

      console.log('url', url);
      console.log('requestConfig', requestConfig);
      fetch(url, requestConfig)
        .then((response) => {

          console.log('response321',response)
          response
          .json()
          .then((responseJSon) =>{

            console.log('response', response);
            console.log('responseJson', responseJSon);
          })
          .catch((errorr) =>{
            console.log('Response JSON error',errorr )


          })
        }
      
        
        )
        .catch((err) => {
          console.log('response err2', err);
          return error(_getErrorMessage(err));
        });
    });
  },



  //new Post method
  postReport: (endPoint,  success, error, formdata = false) => {
   
    getStoredState(persistConfig).then((_state) => {
      let url = config.ReportUrl + endPoint;


      let headers = {
        "Content-Type" : "application/octet-stream",
        "x-rapidapi-host":"quotes15.p.rapidapi.com",
  
        Accept: 'application/json',
      };
  
     
  
  
  

      let requestConfig = {
        method: 'POST',
        headers: new Headers(headers),
     
      };



      console.log('url', url);
      console.log('requestConfig', requestConfig);
      fetch(url, requestConfig)
        .then((response) => {

          console.log('response321',response)
          response
          .json()
          .then((responseJSon) =>{

            return success(responseJSon)
          })
          .catch((errorr) =>{
        return error(errorr)


          })
        }
      
        
        )
        .catch((err) => {
          console.log('response err2', err);
          return error(_getErrorMessage(err));
        });
    });
  },





  // post: (endPoint, credentials, success, error, formdata = false) => {
  //   console.log('endPoint', endPoint);
  //   console.log('credentials', credentials);
  //   getStoredState(persistConfig).then((_state) => {
  //     let url = config.url + endPoint;

  //     let headers = {
  //       'Content-Type':
  //         formdata == true ? 'multipart/form-data' : 'application/json',
  //       Accept: 'application/json',
  //     };

  //     if (_state.GeneralReducer.access_token != null) {
  //       headers['Authorization'] =
  //         'Bearer ' + _state.GeneralReducer.access_token;
  //     }

  //     let dataToSend = JSON.stringify(credentials);

  //     let requestConfig = {
  //       method: 'POST',
  //       headers: new Headers(headers),
  //       body: formdata ? credentials : dataToSend,
  //     };

  //     console.log('url', url);
  //     console.log('requestConfig', requestConfig);
  //     fetch(url, requestConfig)
  //       .then((response) =>
  //         response
  //           .json()
  //           .then((responseJson) => {
  //             console.log('response', response);
  //             console.log('responseJson', responseJson);

  //             if (response.status == 422) {
  //               return error(_getErrorMessage(responseJson));
  //             } else {
  //               return success(responseJson);
  //             }
  //           })
  //           .catch((err) => {
  //             console.log('response err', err);
  //             return error(_getErrorMessage(err));
  //           }),
  //       )
  //       .catch((err) => {
  //         console.log('response err2', err);
  //         return error(_getErrorMessage(err));
  //       });
  //   });
  // },

  postFormData: (endPoint, credentials, success, error) => {
    getStoredState(persistConfig).then((_state) => {
      let url = config.url + endPoint;

      let headers = {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        // "Access-Control-Allow-Origin": "*"
      };

      if (_state.GeneralReducer.access_token != null) {
        headers['Authorization'] =
          'Bearer ' + _state.GeneralReducer.access_token;
      }

      // let dataToSend = JSON.stringify(credentials)

      let requestConfig = {
        method: 'POST',
        headers: new Headers(headers),
        body: credentials,
      };

      fetch(url, requestConfig)
        .then((response) =>
          response
            .json()
            .then((responseJson) => {
              console.log(responseJson);

              if (response.status == 422) {
                // error
                return error(_getErrorMessage(responseJson));
              } else {
                return success(responseJson);
              }
            })
            .catch((err) => {
              return error(_getErrorMessage(err));
            }),
        )
        .catch((err) => {
          return error(_getErrorMessage(err));
        });
    });
  },

  // get: (endPoint, success, error) => {
  //   var _state = store.getState();

  //   let url = config.url + endPoint;

  //   let headers = {
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   };

  //   if (_state) {
  //     if (_state.GeneralReducer.access_token != null) {
  //       headers['Authorization'] =
  //         'Bearer ' + _state.GeneralReducer.access_token;
  //     }
  //   }

  //   console.log('url  ', url, '  ', _state);

  //   let requestConfig = {
  //     method: 'GET',
  //     headers: new Headers(headers),
  //   };

  //   fetch(url, requestConfig)
  //     .then((response) =>
  //       response
  //         .json()
  //         .then((responseJson) => {
  //           console.log('response', response);
  //           console.log('responseJson', responseJson);

  //           if (
  //             response.status == 422 ||
  //             response.status == 401 ||
  //             response.status == 409
  //           ) {
  //             // error
  //             return error(_getErrorMessage(responseJson));
  //           } else {
  //             return success(responseJson);
  //           }
  //         })
  //         .catch((err) => {
  //           return error(_getErrorMessage(err));
  //         }),
  //     )
  //     .catch((err) => {
  //       return error(_getErrorMessage(err));
  //     });
  // },


//new_method
  get: (endPoint, success, error) => {
    var _state = store.getState();

    let url = config.url + endPoint;

    let headers = {
      "Content-Type" : "application/octet-stream",
      "x-rapidapi-host":"quotes15.p.rapidapi.com",

      // Accept: 'application/json',
    };

    // if (_state) {
    //   if (_state.GeneralReducer.access_token != null) {
    //     headers['Authorization'] =
    //       'Bearer ' + _state.GeneralReducer.access_token;
    //   }
    // }

    console.log('url  ', url, '  ', _state);

    let requestConfig = {
      method: 'GET',
      headers: new Headers(headers),
      "params":{
        "language_code":"en"
      }
    };

    fetch(url, requestConfig)
      .then((response) =>
        response
          .json()
          .then((responseJson) => {
            console.log('response', response);
            console.log('responseJson', responseJson);

            if (
              response.status == 422 ||
              response.status == 401 ||
              response.status == 409
            ) {

              console.log('in if')
              // error
              return error(_getErrorMessage(responseJson));
            } else {
              return success(responseJson);
            }
          })
          .catch((err) => {
            console.log('The second last catch',err)
            return error(_getErrorMessage(err));
          }),
      )
      .catch((err) => {

        console.log('The last catch',err)
        return error(_getErrorMessage(err));
      });
  },




  getByPromiseAll: (endPoint, data, success, error) => {
    getStoredState(persistConfig).then((_state) => {
      let url = config.url + endPoint;

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      if (_state) {
        if (_state.GeneralReducer.access_token != null) {
          headers['Authorization'] =
            'Bearer ' + _state.GeneralReducer.access_token;
        }
      }

      let requestConfig = {
        method: 'GET',
        headers: new Headers(headers),
      };

      data.map((_d) => {
        console.log(url + _d.slug, _d);
      });

      const fetchDescription = (item) => fetch(url + item.slug, requestConfig);

      const descriptionRequests = data.map(fetchDescription);
      Promise.all(descriptionRequests)
        .then((response) =>
          Promise.all(response.map((r) => r.json()))
            .then((responseJson) => {
              if (
                response.status == 422 ||
                response.status == 401 ||
                response.status == 409
              ) {
                // error
                console.log('get err 0 ', responseJson);
                return error(_getErrorMessage(responseJson));
              } else {
                return success(responseJson);
              }
            })
            .catch((err) => {
              console.log('get err 1 ', err);
              return error(_getErrorMessage(err));
            }),
        )
        .catch((err) => {
          console.log('get err 2 ', err);
          return error(_getErrorMessage(err));
        });
    });
  },

  delete: (endPoint, success, error) => {
    getStoredState(persistConfig).then((_state) => {
      let url = config.url + endPoint;

      let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      };

      if (_state.GeneralReducer.access_token != null) {
        headers['Authorization'] =
          'Bearer ' + _state.GeneralReducer.access_token;
      }

      let requestConfig = {
        method: 'DELETE',
        headers: new Headers(headers),
      };

      fetch(url, requestConfig)
        .then((response) =>
          response
            .json()
            .then((responseJson) => {
              if (
                response.status == 422 ||
                response.status == 401 ||
                response.status == 409
              ) {
                // error
                return error(_getErrorMessage(responseJson));
              } else {
                return success(responseJson);
              }
            })
            .catch((err) => {
              return error(_getErrorMessage(err));
            }),
        )
        .catch((err) => {
          return error(_getErrorMessage(err));
        });
    });
  },
};

export default Api;
