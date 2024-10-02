import { lazy } from 'react';

const Login =  lazy(() => import('./components/Login'));

export {Login};
export {useAuthUser} from './hooks/quaries';
export {useAuthLogin,useAuthLogout} from './hooks/mutations';