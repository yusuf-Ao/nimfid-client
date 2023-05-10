import { configureStore } from '@reduxjs/toolkit'

import authReducer from './reducers/auth.reducers'
import adminReducer from './reducers/admin.reducer'
import userReducer from './reducers/user.reducer'

export default configureStore({
    reducer: {
        auth: authReducer,
        admin: adminReducer,
        user: userReducer,
    }
})