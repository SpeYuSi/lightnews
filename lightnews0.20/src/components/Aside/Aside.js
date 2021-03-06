import React from 'react';
import "./index.css"
import reqwest from 'reqwest';
import config from '../../config'
import util from "../../lib/util";
class Aside extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hotData: [],
            topSearchList:[],
        }
    }
    componentDidMount(){
        this.getTopSearchList();
        let userId = util.getUser('id');
        if(userId!==null){
            this.getHotData(userId);
        }
    }
    getTopSearchList=()=>{
        reqwest({
            url:`${config.url}/api/hotsearchlist`,
            method:'get',
            contentType: 'application/json',
            success: (res) => {
                this.setState({
                    topSearchList: res.data,
                })
            },

        });
    }
    getHotData=(userId)=>{
        reqwest({
            url:`${config.url}/api/hot_data`,
            method:'get',
            contentType: 'application/json',
            headers: {'userId': userId},
            success: (res) => {
                this.setState({
                    hotData: res,
                })
            },

        });
    }
    handleInputOnFocus= (e) =>{
        var oSearchIcon = document.getElementById('searchIcon');
        oSearchIcon.style.width=0+'px';
        e.target.style.width=166+'px';
        e.target.style.marginLeft=30+'px';
    }
    handleInputOnBlur= (e) =>{
        var oSearchIcon = document.getElementById('searchIcon');
        oSearchIcon.style.width=42+'px';
        e.target.style.width=145+'px';
        e.target.style.marginLeft=52+'px';
    }
    handleGetInputValue=(e)=>{
        this.setState({
            searchInfo : e.target.value,
        })
    }
    handleInputEnter=(e)=>{
        if(e && e.keyCode === 13){
            this.handleSearch()
        }
    }
    handleSearch= ()=>{
        const {searchInfo} = this.state;
        console.log(searchInfo,'Search------searchInfo');
        //put数据
        //跳转页面
        window.location.href=`/search?keyword=${searchInfo}`

    }
    render() {
        return (
            <div id="aside" className="aside">
                <div className="search_container">
                    <input className="search"  type="text" placeholder="搜索资讯"
                           onFocus={this.handleInputOnFocus}
                           onBlur={this.handleInputOnBlur}
                           onChange={this.handleGetInputValue}
                           onKeyDown={this.handleInputEnter}
                    />
                    <div className="search_icon" id="searchIcon"></div>
                    <div className="search_btn" onClick={this.handleSearch}>搜索</div>
                    <div className="search_assist_list"></div>
                </div>
                <div className="channel">
                    <h3 className="channel_title">为您推荐</h3>
                    <div className="channel_list">
                        <ul className="channel_list_show">
                            {(this.state.hotData.length!==0)?
                                this.state.hotData.map((item,index)=>{
                                    return (
                                        <li key={index}>
                                            <a href={item.path} title={item.title}>{item.title}</a>
                                            <div className="channel_subtitle">
                                                <span>{item.author}</span>
                                                <span>{item.createAt}</span>
                                            </div>
                                        </li>
                                    )
                                }): <a href="/login">暂无推荐，请登录。</a>
                            }
                        </ul>
                    </div>
                    <div className="topSearch">
                        <div className="channel_title">热搜榜</div>
                        {
                            this.state.topSearchList.map((item,index)=>{
                                return(
                                    <span key={index} style={{float:"left"}}>
                                        <a href={`/search?keyword=${item.keyword}`} title={item.keyword} target="_blank" rel="noopener noreferrer">{item.keyword}</a>
                                    </span>
                                )
                            })
                        }
                        <div style={{clear:"both"}}></div>
                    </div>
                    <div className="aboutLn">
                    <div className="channel_title">关于LightNews</div>
                    <div className="about_warp">
                        <div className="about_box">
                            <a href="/" target="_blank">
                                <div className="about_bg"></div>
                                <div className="about_title">关于LightNews</div>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Aside;
