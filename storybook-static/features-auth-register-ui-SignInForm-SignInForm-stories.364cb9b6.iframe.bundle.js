"use strict";(self.webpackChunkinctagram_blazing_bonfires=self.webpackChunkinctagram_blazing_bonfires||[]).push([[475],{"./node_modules/@react-oauth/google/dist/index.esm.js":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Nq:()=>useGoogleLogin});var react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/next/dist/compiled/react/index.js");const GoogleOAuthContext=(0,react__WEBPACK_IMPORTED_MODULE_0__.createContext)(null);function useGoogleOAuth(){const context=(0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(GoogleOAuthContext);if(!context)throw new Error("Google OAuth components must be used within GoogleOAuthProvider");return context}function useGoogleLogin({flow="implicit",scope="",onSuccess,onError,onNonOAuthError,overrideScope,state,...props}){const{clientId,scriptLoadedSuccessfully}=useGoogleOAuth(),clientRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(),onSuccessRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onSuccess);onSuccessRef.current=onSuccess;const onErrorRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onError);onErrorRef.current=onError;const onNonOAuthErrorRef=(0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(onNonOAuthError);onNonOAuthErrorRef.current=onNonOAuthError,(0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)((()=>{var _a;if(!scriptLoadedSuccessfully)return;const clientMethod="implicit"===flow?"initTokenClient":"initCodeClient",client=null===(_a=null===window||void 0===window?void 0:window.google)||void 0===_a?void 0:_a.accounts.oauth2[clientMethod]({client_id:clientId,scope:overrideScope?scope:`openid profile email ${scope}`,callback:response=>{var _a,_b;if(response.error)return null===(_a=onErrorRef.current)||void 0===_a?void 0:_a.call(onErrorRef,response);null===(_b=onSuccessRef.current)||void 0===_b||_b.call(onSuccessRef,response)},error_callback:nonOAuthError=>{var _a;null===(_a=onNonOAuthErrorRef.current)||void 0===_a||_a.call(onNonOAuthErrorRef,nonOAuthError)},state,...props});clientRef.current=client}),[clientId,scriptLoadedSuccessfully,flow,scope,state]);const loginImplicitFlow=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((overrideConfig=>{var _a;return null===(_a=clientRef.current)||void 0===_a?void 0:_a.requestAccessToken(overrideConfig)}),[]),loginAuthCodeFlow=(0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((()=>{var _a;return null===(_a=clientRef.current)||void 0===_a?void 0:_a.requestCode()}),[]);return"implicit"===flow?loginImplicitFlow:loginAuthCodeFlow}},"./src/features/auth-register/ui/SignInForm/SignInForm.stories.ts":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,default:()=>SignInForm_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),esm_extends=(__webpack_require__("./src/features/auth-register/ui/CreateNewPassForm/CreateNewPassForm.tsx"),__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js")),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),yup=__webpack_require__("./node_modules/@hookform/resolvers/yup/dist/yup.mjs"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),next_router=__webpack_require__("./node_modules/next/router.js"),esm=__webpack_require__("./node_modules/next-i18next/dist/esm/index.js"),index_esm=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),dist=__webpack_require__("./node_modules/react-hot-toast/dist/index.mjs"),yup_index_esm=__webpack_require__("./node_modules/yup/index.esm.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),SignInForm_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/features/auth-register/ui/SignInForm/SignInForm.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(SignInForm_module.Z,options);const SignInForm_SignInForm_module=SignInForm_module.Z&&SignInForm_module.Z.locals?SignInForm_module.Z.locals:void 0;var OAuth=__webpack_require__("./src/features/auth-register/ui/OAuth/OAuth.tsx"),api=__webpack_require__("./src/shared/api/index.ts"),Button=__webpack_require__("./src/shared/ui/Button/Button.tsx"),FormContainer=__webpack_require__("./src/shared/ui/FormContainer/FormContainer.tsx"),Input=__webpack_require__("./src/shared/ui/Input/Input.tsx"),LinearLoader=__webpack_require__("./src/shared/ui/Loaders/LinearLoader.tsx"),__jsx=react.createElement,SignInForm=function SignInForm(){var _useTranslation=(0,esm.$G)("common",{keyPrefix:"Auth"}),t=_useTranslation.t,tError=(_useTranslation.i18n,(0,esm.$G)("common",{keyPrefix:"Error"}).t),schema=yup_index_esm.Ry().shape({email:yup_index_esm.Z_().min(2,tError("MinCharactrers2")).matches(/^([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9-]+.)+([a-zA-Z]{2,})$/,tError("EmailValidationError")).required(tError("RequiredField")),password:yup_index_esm.Z_().min(6,tError("MinCharactrers6")).max(20,tError("MaxCharactrers20")).required(tError("RequiredField"))}),_useState=(0,react.useState)(""),passwordError=_useState[0],setPasswordError=_useState[1],_useState2=(0,react.useState)(""),emailError=_useState2[0],setEmailError=_useState2[1],_useLoginMutation=(0,api.YA)(),_useLoginMutation2=(0,slicedToArray.Z)(_useLoginMutation,2),login=_useLoginMutation2[0],isLoading=_useLoginMutation2[1].isLoading,router=(0,next_router.useRouter)(),_useForm=(0,index_esm.cI)({mode:"onTouched",resolver:(0,yup.X)(schema),defaultValues:{email:"",password:""}}),control=_useForm.control,handleSubmit=_useForm.handleSubmit,errors=_useForm.formState.errors;return __jsx(react.Fragment,null,__jsx(dist.x7,{position:"top-right"}),isLoading&&__jsx(LinearLoader.j,null),__jsx(FormContainer.Z,{title:t("SignIn")},__jsx(OAuth.f,null),__jsx("form",{className:SignInForm_SignInForm_module.formContainer,onSubmit:handleSubmit((function onSubmit(args){login(args).unwrap().then((function(){return router.push("/profile")})).catch((function(error){if(error&&error.data){var statusCode=error.data.statusCode;400===statusCode?setPasswordError(tError("PasswordIncorrect")):401===statusCode&&setEmailError(tError("EmailNotRegidtred"))}else dist.Am.error(tError("NetworkError"))}))})),noValidate:!0},__jsx(index_esm.Qr,{name:"email",control,render:function render(_ref){var _errors$email,field=_ref.field;return __jsx(Input.I,(0,esm_extends.Z)({label:t("Email"),type:Input.n.EMAIL,placeholder:t("EnterEmail"),error:(null===(_errors$email=errors.email)||void 0===_errors$email?void 0:_errors$email.message)||emailError},field))}}),__jsx(index_esm.Qr,{name:"password",control,render:function render(_ref2){var _errors$password,field=_ref2.field;return __jsx(Input.I,(0,esm_extends.Z)({label:t("Password"),type:Input.n.PASSWORD,placeholder:t("EnterPassword"),error:(null===(_errors$password=errors.password)||void 0===_errors$password?void 0:_errors$password.message)||passwordError},field))}}),__jsx(link_default(),{href:"/forgot-password",className:SignInForm_SignInForm_module.signInForgotText},t("ForgotPassword")),__jsx(Button.zx,{size:Button.qE.STRETCHED},t("SignIn")),__jsx("p",{className:SignInForm_SignInForm_module.helpText},t("DontHaveAccount?")),__jsx(link_default(),{href:"/sign-up",className:SignInForm_SignInForm_module.link},__jsx("p",{className:SignInForm_SignInForm_module.oppositeBtn},t("SignUp"))))))};SignInForm.__docgenInfo={description:"",methods:[],displayName:"SignInForm"};var _Default$parameters,_Default$parameters2;__webpack_require__("./src/features/auth-register/ui/SignUpForm/SignUpForm.tsx"),__webpack_require__("./src/features/auth-register/ui/ForgotPassForm/ForgotPassForm.tsx");function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}const SignInForm_stories={title:"Components/SignInForm",component:SignInForm,parameters:{layout:"centered"},tags:["autodocs"]};var Default={args:{email:"Enter email",password:"Enter password"}};Default.parameters=_objectSpread(_objectSpread({},Default.parameters),{},{docs:_objectSpread(_objectSpread({},null===(_Default$parameters=Default.parameters)||void 0===_Default$parameters?void 0:_Default$parameters.docs),{},{source:_objectSpread({originalSource:"{\n  args: {\n    email: 'Enter email',\n    password: 'Enter password'\n  }\n}"},null===(_Default$parameters2=Default.parameters)||void 0===_Default$parameters2||null===(_Default$parameters2=_Default$parameters2.docs)||void 0===_Default$parameters2?void 0:_Default$parameters2.source)})})},"./src/features/auth-register/ui/CreateNewPassForm/CreateNewPassForm.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{q:()=>CreateNewPassForm});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),yup=__webpack_require__("./node_modules/@hookform/resolvers/yup/dist/yup.mjs"),next_router=__webpack_require__("./node_modules/next/router.js"),esm=__webpack_require__("./node_modules/next-i18next/dist/esm/index.js"),index_esm=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),yup_index_esm=__webpack_require__("./node_modules/yup/index.esm.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),CreateNewPassForm_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/features/auth-register/ui/CreateNewPassForm/CreateNewPassForm.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(CreateNewPassForm_module.Z,options);const CreateNewPassForm_CreateNewPassForm_module=CreateNewPassForm_module.Z&&CreateNewPassForm_module.Z.locals?CreateNewPassForm_module.Z.locals:void 0;var auth_api=__webpack_require__("./src/shared/api/services/auth/auth.api.ts"),Button=__webpack_require__("./src/shared/ui/Button/Button.tsx"),FormContainer=__webpack_require__("./src/shared/ui/FormContainer/FormContainer.tsx"),Input=__webpack_require__("./src/shared/ui/Input/Input.tsx"),Input_module=__webpack_require__("./src/shared/ui/Input/Input.module.scss"),LinearLoader=__webpack_require__("./src/shared/ui/Loaders/LinearLoader.tsx"),__jsx=react.createElement;function CreateNewPassForm(){var _errors$newPassword,_errors$newPasswordCo,_useCreateNewPassword=(0,auth_api.VN)(),_useCreateNewPassword2=(0,slicedToArray.Z)(_useCreateNewPassword,2),createNewPassword=_useCreateNewPassword2[0],isLoading=_useCreateNewPassword2[1].isLoading,t=(0,esm.$G)("common",{keyPrefix:"Auth"}).t,tError=(0,esm.$G)("common",{keyPrefix:"Error"}).t,_useState=(0,react.useState)(""),codeRecovery=_useState[0],setCodeRecovery=_useState[1],router=(0,next_router.useRouter)(),code=router.query.code;(0,react.useEffect)((function(){code&&setCodeRecovery(code)}),[code]);var schema=yup_index_esm.Ry().shape({newPassword:yup_index_esm.Z_().min(6,tError("MinCharactrers6")).max(20,tError("MaxCharactrers20")).matches(/^[a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]*$/,tError("PasswordValidationError")).required(tError("RequiredField")),newPasswordConfirmation:yup_index_esm.Z_().required(tError("RequiredField"))}),_useForm=(0,index_esm.cI)({mode:"onTouched",resolver:(0,yup.X)(schema),defaultValues:{newPassword:"",newPasswordConfirmation:""}}),watch=_useForm.watch,register=_useForm.register,handleSubmit=_useForm.handleSubmit,setError=_useForm.setError,errors=_useForm.formState.errors,reset=_useForm.reset,password=watch("newPassword","");return __jsx(react.Fragment,null,isLoading&&__jsx(LinearLoader.j,null),__jsx(FormContainer.Z,{title:t("CreateNewPassword")},__jsx("form",{onSubmit:handleSubmit((function onSubmit(data){if(!data)throw new Error("data is undefined");data.recoveryCode=codeRecovery,createNewPassword(data).unwrap().then((function(){reset(),router.push("/sign-in")})).catch((function(error){"newPassword"===error.data.messages[0].field&&setError("newPassword",{type:"manual",message:error.data.messages[0].message})}))})),className:CreateNewPassForm_CreateNewPassForm_module.formContainer},__jsx(Input.I,(0,esm_extends.Z)({},register("newPassword"),{label:t("Password"),type:Input.n.PASSWORD,placeholder:t("EnterPassword"),className:Input_module.Z.input,error:errors.newPassword&&(null===(_errors$newPassword=errors.newPassword)||void 0===_errors$newPassword?void 0:_errors$newPassword.message)})),__jsx(Input.I,(0,esm_extends.Z)({},register("newPasswordConfirmation",{validate:{value:function value(_value){return _value===password||t("PasswordDoNotmatch")}}}),{label:t("PasswordConfirmation"),type:Input.n.PASSWORD,placeholder:t("EnterPasswordConfirmation"),className:Input_module.Z.input,error:errors.newPasswordConfirmation&&(null===(_errors$newPasswordCo=errors.newPasswordConfirmation)||void 0===_errors$newPasswordCo?void 0:_errors$newPasswordCo.message)})),__jsx(Button.zx,{size:Button.qE.STRETCHED,className:CreateNewPassForm_CreateNewPassForm_module.sendLinkBtn},t("CreateNewPassword")))))}CreateNewPassForm.__docgenInfo={description:"",methods:[],displayName:"CreateNewPassForm"}},"./src/features/auth-register/ui/ForgotPassForm/ForgotPassForm.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{n:()=>ForgotPass});var esm_extends=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/extends.js"),slicedToArray=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/slicedToArray.js"),react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),yup=__webpack_require__("./node_modules/@hookform/resolvers/yup/dist/yup.mjs"),next_link=__webpack_require__("./node_modules/next/link.js"),link_default=__webpack_require__.n(next_link),esm=__webpack_require__("./node_modules/next-i18next/dist/esm/index.js"),lib_esm=__webpack_require__("./node_modules/react-google-recaptcha/lib/esm/index.js"),index_esm=__webpack_require__("./node_modules/react-hook-form/dist/index.esm.mjs"),dist=__webpack_require__("./node_modules/react-hot-toast/dist/index.mjs"),yup_index_esm=__webpack_require__("./node_modules/yup/index.esm.js"),injectStylesIntoStyleTag=__webpack_require__("./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"),injectStylesIntoStyleTag_default=__webpack_require__.n(injectStylesIntoStyleTag),styleDomAPI=__webpack_require__("./node_modules/style-loader/dist/runtime/styleDomAPI.js"),styleDomAPI_default=__webpack_require__.n(styleDomAPI),insertBySelector=__webpack_require__("./node_modules/style-loader/dist/runtime/insertBySelector.js"),insertBySelector_default=__webpack_require__.n(insertBySelector),setAttributesWithoutAttributes=__webpack_require__("./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"),setAttributesWithoutAttributes_default=__webpack_require__.n(setAttributesWithoutAttributes),insertStyleElement=__webpack_require__("./node_modules/style-loader/dist/runtime/insertStyleElement.js"),insertStyleElement_default=__webpack_require__.n(insertStyleElement),styleTagTransform=__webpack_require__("./node_modules/style-loader/dist/runtime/styleTagTransform.js"),styleTagTransform_default=__webpack_require__.n(styleTagTransform),ForgotPassForm_module=__webpack_require__("./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/features/auth-register/ui/ForgotPassForm/ForgotPassForm.module.scss"),options={};options.styleTagTransform=styleTagTransform_default(),options.setAttributes=setAttributesWithoutAttributes_default(),options.insert=insertBySelector_default().bind(null,"head"),options.domAPI=styleDomAPI_default(),options.insertStyleElement=insertStyleElement_default();injectStylesIntoStyleTag_default()(ForgotPassForm_module.Z,options);const ForgotPassForm_ForgotPassForm_module=ForgotPassForm_module.Z&&ForgotPassForm_module.Z.locals?ForgotPassForm_module.Z.locals:void 0;var auth_api=__webpack_require__("./src/shared/api/services/auth/auth.api.ts"),Button=__webpack_require__("./src/shared/ui/Button/Button.tsx"),FormContainer=__webpack_require__("./src/shared/ui/FormContainer/FormContainer.tsx"),Input=__webpack_require__("./src/shared/ui/Input/Input.tsx"),Input_module=__webpack_require__("./src/shared/ui/Input/Input.module.scss"),LinearLoader=__webpack_require__("./src/shared/ui/Loaders/LinearLoader.tsx"),Modal=__webpack_require__("./src/shared/ui/Modal/Modal.tsx"),__jsx=react.createElement;function ForgotPass(){var _errors$email,t=(0,esm.$G)("common",{keyPrefix:"Auth"}).t,tError=(0,esm.$G)("common",{keyPrefix:"Error"}).t,_useState=(0,react.useState)(!1),isSentPass=_useState[0],setIsSentPass=_useState[1],_useRecoverPasswordMu=(0,auth_api.Me)(),_useRecoverPasswordMu2=(0,slicedToArray.Z)(_useRecoverPasswordMu,2),recoverPassword=_useRecoverPasswordMu2[0],isLoading=_useRecoverPasswordMu2[1].isLoading,schema=yup_index_esm.Ry().shape({email:yup_index_esm.Z_().email(tError("EmailValidationError")).required(tError("RequiredField")),recaptcha:yup_index_esm.Z_().required()}),_useForm=(0,index_esm.cI)({mode:"onChange",resolver:(0,yup.X)(schema),defaultValues:{email:"",recaptcha:""}}),register=_useForm.register,handleSubmit=_useForm.handleSubmit,setValue=_useForm.setValue,errors=_useForm.formState.errors,reset=_useForm.reset;return __jsx(react.Fragment,null,__jsx(dist.x7,{position:"top-right"}),isLoading&&__jsx(LinearLoader.j,null),__jsx(FormContainer.Z,{title:t("ForgotPassword")},__jsx("form",{onSubmit:handleSubmit((function onSubmit(data){recoverPassword(data).unwrap().then((function(){reset(),setIsSentPass(!0)})).catch((function(error){error&&dist.Am.error(error.data.error)}))})),className:ForgotPassForm_ForgotPassForm_module.formContainer},__jsx(Input.I,(0,esm_extends.Z)({},register("email"),{label:t("Email"),type:Input.n.EMAIL,placeholder:t("EnterEmail"),className:Input_module.Z.input,error:errors.email&&(null===(_errors$email=errors.email)||void 0===_errors$email?void 0:_errors$email.message)})),__jsx("p",{className:ForgotPassForm_ForgotPassForm_module.forgotHelpText},t("EnterEmailForGetInstruction")),isSentPass&&__jsx(Modal.u,{title:t("PasswordSent"),mainButton:" OK ",callBackCloseWindow:function callBackCloseWindow(){return setIsSentPass(!1)}},__jsx("p",null,t("LinkHasBeenSent"))),__jsx(Button.zx,{size:Button.qE.STRETCHED,className:ForgotPassForm_ForgotPassForm_module.sendLinkBtn},t(isSentPass?"SendAgain":"SendLink")),__jsx(link_default(),{href:"/sign-in"},__jsx(Button.zx,{className:ForgotPassForm_ForgotPassForm_module.oppositeBtn,theme:Button.bn.CLEAR,size:Button.qE.MIDDLE},t("BackToSignIn"))),__jsx(lib_esm.Z,{sitekey:"6LeY2y0mAAAAANwI_paCWfoksCgBm1n2z9J0nwNQ",onChange:function onChangeRecaptchaHandler(value){setValue("recaptcha",value)},theme:"dark","aria-required":!0}))))}ForgotPass.__docgenInfo={description:"",methods:[],displayName:"ForgotPass"}},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/features/auth-register/ui/CreateNewPassForm/CreateNewPassForm.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,'.CreateNewPassForm_formContainer__h3Sbi{display:flex;gap:1.5rem;flex-direction:column;align-items:center;width:100%}.CreateNewPassForm_createPassHelpText___Ul50{color:var(--color-light-1000);font-size:var(--font-size-s);margin-top:-1rem}.CreateNewPassForm_enterEmail__utg61{margin-top:.875rem}.CreateNewPassForm_sendLinkBtn__M6d8p{margin:1rem 0 .75rem}.CreateNewPassForm_oppositeBtn__y63iq{border:none !important}.CreateNewPassForm_capchaContainer__MVdpt{display:flex;justify-content:space-between;width:calc(100% - 30px);height:5.25rem;padding:.875rem 1.25rem;border:solid 1px #333;border-radius:2px;align-items:center}.CreateNewPassForm_capchaContainer__MVdpt input{position:relative;top:2px;left:3px;margin:0;margin-right:1.2rem;transform:scale(1.5)}.CreateNewPassForm_capchaContainer__MVdpt label{font-family:"Roboto",sans-serif;font-weight:var(--font-weight-medium);font-size:var(--font-size-xs)}.CreateNewPassForm_capchaIcon__IebjB{display:flex;flex-direction:column;align-items:center}.CreateNewPassForm_capchaIcon__IebjB p{margin:0;margin-top:7px;font-family:"Roboto",sans-serif;font-weight:var(--font-weight-medium);font-size:8px;line-height:10px}.CreateNewPassForm_capchaIcon__IebjB span{font-family:"Roboto",sans-serif;font-weight:var(--font-weight-medium);font-size:6px;line-height:8px}',"",{version:3,sources:["webpack://./src/features/auth-register/ui/CreateNewPassForm/CreateNewPassForm.module.scss"],names:[],mappings:"AAAA,wCACE,YAAA,CACA,UAAA,CACA,qBAAA,CACA,kBAAA,CACA,UAAA,CAGF,6CACE,6BAAA,CACA,4BAAA,CACA,gBAAA,CAEF,qCACE,kBAAA,CAGF,sCACE,oBAAA,CAEF,sCACE,sBAAA,CAEF,0CACE,YAAA,CACA,6BAAA,CACA,uBAAA,CACA,cAAA,CACA,uBAAA,CAEA,qBAAA,CACA,iBAAA,CACA,kBAAA,CAEA,gDACE,iBAAA,CACA,OAAA,CACA,QAAA,CACA,QAAA,CACA,mBAAA,CACA,oBAAA,CAEF,gDACE,+BAAA,CACA,qCAAA,CACA,6BAAA,CAGJ,qCACE,YAAA,CACA,qBAAA,CACA,kBAAA,CAEA,uCACE,QAAA,CACA,cAAA,CACA,+BAAA,CACA,qCAAA,CACA,aAAA,CACA,gBAAA,CAEF,0CACE,+BAAA,CACA,qCAAA,CACA,aAAA,CACA,eAAA",sourcesContent:[".formContainer {\r\n  display: flex;\r\n  gap: 1.5rem;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.createPassHelpText {\r\n  color: var(--color-light-1000);\r\n  font-size: var(--font-size-s);\r\n  margin-top: -1rem;\r\n}\r\n.enterEmail {\r\n  margin-top: 0.875rem;\r\n}\r\n\r\n.sendLinkBtn {\r\n  margin: 1rem 0 0.75rem;\r\n}\r\n.oppositeBtn {\r\n  border: none !important;\r\n}\r\n.capchaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  width: calc(100% - 30px);\r\n  height: 5.25rem;\r\n  padding: 0.875rem 1.25rem;\r\n\r\n  border: solid 1px #333333;\r\n  border-radius: 2px;\r\n  align-items: center;\r\n\r\n  input {\r\n    position: relative;\r\n    top: 2px;\r\n    left: 3px;\r\n    margin: 0;\r\n    margin-right: 1.2rem;\r\n    transform: scale(1.5);\r\n  }\r\n  label {\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: var(--font-weight-medium);\r\n    font-size: var(--font-size-xs);\r\n  }\r\n}\r\n.capchaIcon {\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n\r\n  p {\r\n    margin: 0;\r\n    margin-top: 7px;\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: var(--font-weight-medium);\r\n    font-size: 8px;\r\n    line-height: 10px;\r\n  }\r\n  span {\r\n    font-family: 'Roboto', sans-serif;\r\n    font-weight: var(--font-weight-medium);\r\n    font-size: 6px;\r\n    line-height: 8px;\r\n  }\r\n}\r\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={formContainer:"CreateNewPassForm_formContainer__h3Sbi",createPassHelpText:"CreateNewPassForm_createPassHelpText___Ul50",enterEmail:"CreateNewPassForm_enterEmail__utg61",sendLinkBtn:"CreateNewPassForm_sendLinkBtn__M6d8p",oppositeBtn:"CreateNewPassForm_oppositeBtn__y63iq",capchaContainer:"CreateNewPassForm_capchaContainer__MVdpt",capchaIcon:"CreateNewPassForm_capchaIcon__IebjB"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/features/auth-register/ui/ForgotPassForm/ForgotPassForm.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".ForgotPassForm_formContainer__4hNwH{display:flex;gap:1.5rem;flex-direction:column;align-items:center;width:100%}.ForgotPassForm_forgotHelpText__nXafx{color:var(--color-light-1000)}.ForgotPassForm_enterEmail__VgLBw{margin-top:.875rem}.ForgotPassForm_forgotHelpText__nXafx{font-size:var(--font-size-s)}.ForgotPassForm_linkAgainText__7eB1P{font-size:var(--font-size-s)}.ForgotPassForm_sendLinkBtn__F21s2{margin-top:-0.4rem}.ForgotPassForm_oppositeBtn__37x99{border:none !important}","",{version:3,sources:["webpack://./src/features/auth-register/ui/ForgotPassForm/ForgotPassForm.module.scss"],names:[],mappings:"AAAA,qCACE,YAAA,CACA,UAAA,CACA,qBAAA,CACA,kBAAA,CACA,UAAA,CAGF,sCACE,6BAAA,CAGF,kCACE,kBAAA,CAGF,sCACE,4BAAA,CAGF,qCACE,4BAAA,CAGF,mCACE,kBAAA,CAGF,mCACE,sBAAA",sourcesContent:[".formContainer {\r\n  display: flex;\r\n  gap: 1.5rem;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n\r\n.forgotHelpText {\r\n  color: var(--color-light-1000);\r\n}\r\n\r\n.enterEmail {\r\n  margin-top: 0.875rem;\r\n}\r\n\r\n.forgotHelpText {\r\n  font-size: var(--font-size-s);\r\n}\r\n\r\n.linkAgainText {\r\n  font-size: var(--font-size-s);\r\n}\r\n\r\n.sendLinkBtn {\r\n  margin-top: -0.4rem;\r\n}\r\n\r\n.oppositeBtn {\r\n  border: none !important;\r\n}\r\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={formContainer:"ForgotPassForm_formContainer__4hNwH",forgotHelpText:"ForgotPassForm_forgotHelpText__nXafx",enterEmail:"ForgotPassForm_enterEmail__VgLBw",linkAgainText:"ForgotPassForm_linkAgainText__7eB1P",sendLinkBtn:"ForgotPassForm_sendLinkBtn__F21s2",oppositeBtn:"ForgotPassForm_oppositeBtn__37x99"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/cjs.js??ruleSet[1].rules[13].use[1]!./node_modules/postcss-loader/dist/cjs.js!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js??ruleSet[1].rules[13].use[4]!./src/features/auth-register/ui/SignInForm/SignInForm.module.scss":(module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.d(__webpack_exports__,{Z:()=>__WEBPACK_DEFAULT_EXPORT__});var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/css-loader/dist/runtime/sourceMaps.js"),_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__),_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("./node_modules/css-loader/dist/runtime/api.js"),___CSS_LOADER_EXPORT___=__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__)()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());___CSS_LOADER_EXPORT___.push([module.id,".SignInForm_formContainer__tN1Ix{display:flex;gap:1.5rem;flex-direction:column;align-items:center;width:100%}.SignInForm_signInForgotText__B_DCv{width:100%;text-align:right;margin-top:1.5rem;text-decoration:none}.SignInForm_forgotHelpText__AOPIn{color:var(--color-light-1000);margin-top:-1rem}.SignInForm_helpText__XGOej{margin-top:-0.3rem}.SignInForm_oppositeBtn__lBmZE{border:none !important;margin-top:-1rem;color:var(--color-info-500)}.SignInForm_link__EhWuS{text-decoration:none}","",{version:3,sources:["webpack://./src/features/auth-register/ui/SignInForm/SignInForm.module.scss"],names:[],mappings:"AAAA,iCACE,YAAA,CACA,UAAA,CACA,qBAAA,CACA,kBAAA,CACA,UAAA,CAEF,oCACE,UAAA,CACA,gBAAA,CACA,iBAAA,CACA,oBAAA,CAEF,kCACE,6BAAA,CACA,gBAAA,CAEF,4BACE,kBAAA,CAEF,+BACE,sBAAA,CACA,gBAAA,CAEA,2BAAA,CAEF,wBACE,oBAAA",sourcesContent:[".formContainer {\r\n  display: flex;\r\n  gap: 1.5rem;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  width: 100%;\r\n}\r\n.signInForgotText {\r\n  width: 100%;\r\n  text-align: right;\r\n  margin-top: 1.5rem;\r\n  text-decoration: none;\r\n}\r\n.forgotHelpText {\r\n  color: var(--color-light-1000);\r\n  margin-top: -1rem;\r\n}\r\n.helpText {\r\n  margin-top: -0.3rem;\r\n}\r\n.oppositeBtn {\r\n  border: none !important;\r\n  margin-top: -1rem;\r\n\r\n  color: var(--color-info-500);\r\n}\r\n.link {\r\n  text-decoration: none;\r\n}\r\n"],sourceRoot:""}]),___CSS_LOADER_EXPORT___.locals={formContainer:"SignInForm_formContainer__tN1Ix",signInForgotText:"SignInForm_signInForgotText__B_DCv",forgotHelpText:"SignInForm_forgotHelpText__AOPIn",helpText:"SignInForm_helpText__XGOej",oppositeBtn:"SignInForm_oppositeBtn__lBmZE",link:"SignInForm_link__EhWuS"};const __WEBPACK_DEFAULT_EXPORT__=___CSS_LOADER_EXPORT___},"./node_modules/css-loader/dist/runtime/getUrl.js":module=>{module.exports=function(url,options){return options||(options={}),url?(url=String(url.__esModule?url.default:url),/^['"].*['"]$/.test(url)&&(url=url.slice(1,-1)),options.hash&&(url+=options.hash),/["'() \t\n]|(%20)/.test(url)||options.needQuotes?'"'.concat(url.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):url):url}}}]);