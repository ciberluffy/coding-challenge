import { RECEIVE_API_DETAILS } from "../actions/actions"

export default (state={}, {type, detail}) => {
   switch (type) {
      case RECEIVE_API_DETAILS:
         return detail;
      default:
         return state;
   }
};
