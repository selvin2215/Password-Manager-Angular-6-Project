export interface IPassDetails {
	pwdId? : string,
	nickName : string,
	userName : string,
	password : string,
	socialType : string,
	showPwd? : boolean,
	description : string
}

export interface IUserSignUpDetails {
	name : string,
	email : string,
	password : string,
	mobile? : number
}
export interface IUserLoginDetails {
	email : string,
	password : string
}

export interface IAddPassDetails {
	userId : string,
	nickName : string,
	userName : string,
	password : string,
	socialType : string,
	description : string
}