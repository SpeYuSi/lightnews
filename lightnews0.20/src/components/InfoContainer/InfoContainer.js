import React from 'react';
import './index.css'


class InfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user:{},
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            user:nextProps.user
        })
    }
    render() {
        const {user} = this.state
        var tagsArr = [];

        if(user.keyword!==undefined){
            tagsArr=Object.getOwnPropertyNames(user.keyword)
        }
        return (
            <div className="info_root">
            <div className="info_container main flex-block">
                <h3 className="title">个人资料</h3>
                <div className="user_info flex-block">
                    <div className="avatar" id="avatar_mod">
                        <img src={user.avatar} alt=""/>
                        <p >修改头像</p>
                    </div>
                    <div className="right">
                        <div className="info_item flex-block flex_row_between">
                            <span>昵称：{user.nickname}</span>
                            <span className="mod_name" id="info_mod">修改资料</span>
                        </div>
                        <div className="info_item">
                            <span>生日：{user.birth}</span>
                        </div>
                        <div className="info_item">
                            <span>行业：{user.industry}</span>
                        </div>
                        <div className="tags_item">
                            <span >感兴趣标签：</span>
                            <div className="tags_content">
                            {
                                tagsArr.slice(0,10).map((item,index)=>{
                                    return(
                                        <span key={index} className="tags">{item}</span>
                                    )
                                })
                            }
                        </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}

export default InfoContainer;
