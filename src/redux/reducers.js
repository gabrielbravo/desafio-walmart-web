import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import history from './../utils/history';
import { SearchReducer } from './../pages/search/redux/reducer';


export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({    
    router: connectRouter(history),
    SearchReducer
  });

  return rootReducer;
}
