
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export class Message {
  constructor (msg, type, duration = 5000) {
    this.id = Math.floor(Math.random() * 1000000000)
    this.msg = msg
    this.duration = duration
    this.type = type || 'message'
  }

  getAction() {
    return {
      id: this.id,
      duration: this.duration,
      msg: this.msg,
      type: this.type,
    }
  }

}

export const setMsgAsync = createAsyncThunk(
  'notifications/setMsg',
  async (msg, {dispatch}) => {
    dispatch(resetMsgAsync(msg))
    return msg;
  }
);

export const resetMsgAsync = createAsyncThunk(
  'notifications/resetMsg',
  async (msg) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, msg.duration)
    })
    return msg.id;
  }
);


const initialState = {
  messages: []
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setMsg: (state, {payload}) => {
      state.messages.push(payload);
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(setMsgAsync.fulfilled, (state, {payload}) => {
          state.messages.push(payload);
      })
      .addCase(resetMsgAsync.fulfilled, (state, {payload}) => {
          state.messages = state.messages.filter(m=>m.id !== payload)
      })
    }
});

export const getMessages = (state) => state.notifications.messages;





export const { setMsg } = notificationsSlice.actions;

export default notificationsSlice.reducer;

