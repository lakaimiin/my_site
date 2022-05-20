import React, {useState} from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import PurchaseBackButton from '../components/purchaseBackButton';
import PurchaseItemDetailPicture from '../components/purchaseItemDetailPicture';
import PurchaseItemDetailName from '../components/purchaseItemDetailName';
import PurchaseItemDetailFigureBox from '../components/purchaseItemDetailFigureBox';
import PurchaseItemDetailType from '../components/purchaseItemDetailType';
import env from "react-dotenv";
import {moneyWithTwoDecimal} from '../functionallity/dataConvertor';
import DataTable from 'react-data-table-component';
import LoadingAnimation from '../components/loadingAnimation';

import { ReactComponent as IconHelmet } from '../img/buybox/helmet.svg';
import { ReactComponent as IconTime } from '../img/buybox/time.svg';

export default function BuyBox(){
    const { t } = useTranslation();
    const heroNumber = [1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    const ecoinPrice = env.COMMON_BOX_ECOIN_PRICE;
    const currencyPrice = env.COMMON_BOX_CURRENCY_PRICE;
    const [number, setNumber] = useState(1);
    const [boxPrice, setBoxPrice] = useState(ecoinPrice);
    const [boxCurrencyPrice, setBoxCurrencyPrice] = useState(currencyPrice);
    const [figureMinus, setFigureMinus] = useState(false);
    const [figurePlus, setFigurePlus] = useState(false);
    const [tabActive, setTabActive] = useState([true, false]);

    const columns = [
        {
            name: t('hero_rarity'),
            selector: row => row.hero_rarity,
            sortable: false
        },
        {
            name: t('skin_rarity'),
            selector: row => row.skin_rarity,
            sortable: false,
            conditionalCellStyles: [
                {
                    when: row => row.skin_rarity === 'Normal Skin',
                    style: {
                        color: '#00f0ff'
                    },
                },
                {
                    when: row => row.skin_rarity === 'Rare Skin',
                    style: {
                        color: '#2fff6a'
                    },
                },
                {
                    when: row => row.skin_rarity === 'Mythical Skin',
                    style: {
                        color: '#ef3ff6'
                    },
                },
            ]
        },
        {
            name: t('box_probability'),
            selector: row => row.box_probability,
            sortable: false,
            conditionalCellStyles: [
                {
                    when: row => row.skin_rarity,
                    style: {
                        color: '#FFFFFF'
                    },
                }
            ]
        },
    ];

    const data = [
        {
            hero_rarity: 'Common Hero',
            skin_rarity: 'Normal Skin',
            box_probability: '85%',
        },
        {
            hero_rarity: 'Common Hero',
            skin_rarity: 'Rare Skin',
            box_probability: '10%',
        },
        {
            hero_rarity: 'Common Hero',
            skin_rarity: 'Mythical Skin',
            box_probability: '5%',
        },
        {
            hero_rarity: 'Epic Hero',
            skin_rarity: 'Normal Skin',
            box_probability: '0%',
        },
        {
            hero_rarity: 'Epic Hero',
            skin_rarity: 'Rare Skin',
            box_probability: '0%',
        },
        {
            hero_rarity: 'Epic Hero',
            skin_rarity: 'Mythical Skin',
            box_probability: '0%',
        },
        {
            hero_rarity: 'Legendary Hero',
            skin_rarity: 'Normal Skin',
            box_probability: '0%',
        },
        {
            hero_rarity: 'Legendary Hero',
            skin_rarity: 'Rare Skin',
            box_probability: '0%',
        },
        {
            hero_rarity: 'Legendary Hero',
            skin_rarity: 'Mythical Skin',
            box_probability: '0%',
        }
    ];

    const conditionalRowStyles = [
        {
            when: row => row.hero_rarity === 'Common Hero',
            style: {
                backgroundColor: 'rgba(0,109,133,.27)',
                color: '#00f0ff'
            },
        },
        {
            when: row => row.hero_rarity === 'Epic Hero',
            style: {
                backgroundColor: 'rgba(41,0,73,.4)',
                color: '#ff7bfa'
            },
        },
        {
            when: row => row.hero_rarity === 'Legendary Hero',
            style: {
                backgroundColor: 'rgba(95,68,0,.4)',
                color: '#ffb800'
            },
        },
    ];

    const getBoxId = window.location.pathname.split("/");
    const boxId = getBoxId[2];

    if(boxId === undefined){
        window.location = "/";
    }

    function figureHandler(e){
        const validation = new RegExp(env.REGEX_NUMBERIC);
        if(parseInt(e.target.value) === 0 || e.target.value.length < 1){
            setNumber(0);
            setFigureMinus(true);
        }
        else{
            setFigureMinus(false);
        }

        if(parseInt(e.target.value) >= parseInt(env.MAX_PURCHASE_NUMBER)){
            setFigurePlus(true);
        }
        else{
            setFigurePlus(false);
        }
        
        if(validation.test(e.target.value)){
            let value = e.target.value;
            
            if(e.target.value.length > 1 && e.target.value.charAt(0) === "0"){
                value = e.target.value.substring(1);
            }

            setNumber(value);
        }

        priceCalculator(e.target.value);
    }

    function figureAdjustHandler(data){
        var thisNum;
        if(data === "+"){
            thisNum = number + 1;
            if(parseInt(thisNum) <= parseInt(env.MAX_PURCHASE_NUMBER)){
                setNumber(prev => parseInt(prev) + 1);
                priceCalculator(thisNum);
            }

            if(parseInt(thisNum) < parseInt(env.MAX_PURCHASE_NUMBER)){
                setFigurePlus(false);
                setFigureMinus(false);
            }
            else{
                setFigurePlus(true);
            }
        }
        else{
            thisNum = number - 1;
            if(parseInt(thisNum) >= 0){
                setNumber(prev => parseInt(prev) - 1);
                priceCalculator(thisNum);
            }
            
            if(parseInt(thisNum) > 0){
                setFigurePlus(false);
                setFigureMinus(false);
            }
            else{
                setFigureMinus(true);
            }
        }
    }

    function priceCalculator(num){
        const totalEcoin = num * ecoinPrice;
        const totalCurrency = moneyWithTwoDecimal(num * currencyPrice);

        setBoxPrice(totalEcoin);
        setBoxCurrencyPrice(totalCurrency);
    }

    function tabHandler(data){
        const temp = tabActive.map(x => false);
        temp[data] = true;
        setTabActive(temp);
    }

    return <>
        <div>
            <div style={{position: 'relative'}}>
                <Container>
                    <Row>
                        <Col>
                            <PurchaseBackButton link='/' name={t('back_to_dashboard')} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <PurchaseItemDetailPicture 
                                bgLabel={require('../img/buybox/box_'+boxId+'_label_bg.png')} 
                                heroImg={require('../img/dashboard/box_'+boxId+'.png')}
                            />
                        </Col>
                        <Col>
                            <PurchaseItemDetailName colorType={boxId} name={t('box')} type={t(boxId)} />
                            
                            <div className='buybox_remaining_container'>
                                <div>
                                    <PurchaseItemDetailType
                                        icon={IconHelmet}
                                        title={t('remaining_boxes')}
                                        value={t('unlimited')}
                                    />
                                </div>
                                <div>
                                    <PurchaseItemDetailType
                                        icon={IconTime}
                                        title={t('remaining_boxes')}
                                        value={t('unlimited')}
                                    />
                                </div>
                            </div>

                            <PurchaseItemDetailFigureBox 
                                quantityControl={true} 
                                boxPrice={boxPrice}
                                boxCurrencyPrice={boxCurrencyPrice}
                                figureMinus={figureMinus}
                                figurePlus={figurePlus}
                                figureAdjustHandler={figureAdjustHandler}
                                figureHandler={figureHandler}
                                number={number}
                                buttonText={t('purchase')}
                            />
                            
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <Row>
                    <Col>
                        <div className='tabs_container mt-5'>
                            <div className={tabActive[0] ? 'active' : ''} onClick={() => tabHandler(0)}>{t('drop_rate')}</div>
                            <div className={tabActive[1] ? 'active' : ''} onClick={() => tabHandler(1)}>{t('available_items')}</div>
                        </div>

                        {tabActive[0] && <div>
                            <div className="buybox_datatable mb-5">
                                <DataTable
                                    columns={columns}
                                    data={data}
                                    conditionalRowStyles={conditionalRowStyles}
                                    // progressPending={loading}
                                    progressComponent={<LoadingAnimation />}
                                    // pagination
                                    // paginationServer
                                    // paginationTotalRows={totalRows}
                                    // selectableRows={props.selectableRows}
                                    // selectableRowSelected={rowSelectCritera}
                                    // fixedHeader
                                    // fixedHeaderScrollHeight="497px"
                                    // onSort={handleSort}
                                    // sortServer
                                    // paginationComponent={CustomMaterialPagination}
                                    // noDataComponent={
                                    //     <div className="datatable_no_entries">
                                    //         <div className="img"><img src={require('../img/empty_state.png')} alt="" /></div>
                                    //         <div className="text">{t('no_data_entries')}</div>
                                    //     </div>
                                    // }
                                />
                            </div>
                        </div>}

                        {tabActive[1] && <div>
                            <div className='buybox_available_items mb-5'>
                                <div>{t('available_heroes')} <span className='number'>26</span></div>

                                <div className='list'>
                                    {
                                        heroNumber.map((value, key) => 
                                            <div className='item' key={key}>
                                                <div className='frame'><img src={require('../img/buybox/heroProfilePicture/hero_pic.png')} alt="" /></div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>}
                    </Col>
                </Row>
            </Container>
        </div>
    </>
}