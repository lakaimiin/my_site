import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import env from "react-dotenv";

export default function Dashboard(){
    const { t } = useTranslation();

    return <>
        <div className='dashboard_container'>
            <Container>
                <Row>
                    <Col className='dashboard_text_container'>
                        <h1>{t('box_name')}</h1>
                        <p>{t('box_desc_1')}</p>
                        <p>{t('box_desc_2')}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Link to={`${env.URL_BUYBOX_PAGE}common`}>
                            <div className='dashboard_box_container'>
                                <div className='box'>
                                    <img src={require('../img/dashboard/box_common_bg.png')} className='box_bg' alt="" />
                                    <img src={require('../img/dashboard/box_common.png')} className='box_img' alt="" />
                                </div>
                                <div className='box_desc'>
                                    <div className='box_rarity_level_name'>{t('common_box')}</div>
                                    <div className='box_price_container'>
                                        <div className='box_price_title'>{t('price')}</div>
                                        <div className='box_price_show'>
                                            <div className='purchase_price'>
                                                <div><img src={require('../img/general/coin_icon.png')} className='coin_icon' alt='' /></div> 
                                                <div>1,000</div>
                                                <span>{env.DEFAULT_ECOIN}</span>
                                            </div>
                                            <div className='box_currency_price'>$ 4.03 {env.DEFAULT_CURRENCY}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={`${env.URL_BUYBOX_PAGE}epic`}>
                            <div className='dashboard_box_container'>
                                <div className='box'>
                                    <img src={require('../img/dashboard/box_epic_bg.png')} className='box_bg' alt="" />
                                    <img src={require('../img/dashboard/box_epic.png')} className='box_img' alt="" />
                                </div>
                                <div className='box_desc'>
                                    <div className='box_rarity_level_name'>{t('epic_box')}</div>
                                    <div className='box_price_container'>
                                        <div className='box_price_title'>{t('price')}</div>
                                        <div className='box_price_show'>
                                            <div className='purchase_price'>
                                                <div><img src={require('../img/general/coin_icon.png')} className='coin_icon' alt='' /></div> 
                                                <div>1,000</div>
                                                <span>{env.DEFAULT_ECOIN}</span>
                                            </div>
                                            <div className='box_currency_price'>$ 4.03 {env.DEFAULT_CURRENCY}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                    <Col>
                        <Link to={`${env.URL_BUYBOX_PAGE}legendary`}>
                            <div className='dashboard_box_container'>
                                <div className='box'>
                                    <img src={require('../img/dashboard/box_legendary_bg.png')} className='box_bg' alt="" />
                                    <img src={require('../img/dashboard/box_legendary.png')} className='box_img' alt="" />
                                </div>
                                <div className='box_desc'>
                                    <div className='box_rarity_level_name'>{t('legendary_box')}</div>
                                    <div className='box_price_container'>
                                        <div className='box_price_title'>{t('price')}</div>
                                        <div className='box_price_show'>
                                            <div className='purchase_price'>
                                                <div><img src={require('../img/general/coin_icon.png')} className='coin_icon' alt='' /></div> 
                                                <div>1,000</div>
                                                <span>{env.DEFAULT_ECOIN}</span>
                                            </div>
                                            <div className='box_currency_price'>$ 4.03 {env.DEFAULT_CURRENCY}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </Col>
                </Row>
            </Container>
        </div>
    </>;
}