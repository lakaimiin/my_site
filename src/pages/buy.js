import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import DoubleRangeSlider from '../components/doubleRangeSlider';
import FilterCollapse from '../components/filterCollapse';
import BuyListComponent from '../components/buyListComponent';
import DataTable from 'react-data-table-component';
import SvgDisplay from '../components/svgDisplay';
import {moneyWithComma, moneyWithTwoDecimal} from '../functionallity/dataConvertor';
import LoadingAnimation from '../components/loadingAnimation';
import env from "react-dotenv";

import { ReactComponent as IconEmptySearch } from '../img/buy/empty.svg';
import { ReactComponent as IconArrowForward } from '../img/general/back_arrow.svg';

export default function Buy(){
    const { t } = useTranslation();
    const perPage = env.DEFAULT_TABLE_PER_ROW;
    const [currentDatatablePage, setCurrentDatatablePage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([
        {
            id: 0,
            hero_img: 'hero_1.png',
            hero_rarity: 'epic',
            hero_title: 'MYSTERY MASK',
            hero_name: 'DURASS',
            hero_battle: 33,
            hero_max_battle: 442,
            price: 3400
        },
        {
            id: 1,
            hero_img: 'hero_2.png',
            hero_rarity: 'common',
            hero_title: 'THE BABY',
            hero_name: 'CULIEN',
            hero_battle: 33,
            hero_max_battle: 442,
            price: 1400
        },
        {
            id: 2,
            hero_img: 'hero_1.png',
            hero_rarity: 'legendary',
            hero_title: 'THE BABY',
            hero_name: 'CULIEN',
            hero_battle: 0,
            hero_max_battle: 442,
            price: 5400
        },
        {
            id: 3,
            hero_img: 'hero_1.png',
            hero_rarity: 'legendary',
            hero_title: 'THE BABY',
            hero_name: 'CULIEN',
            hero_battle: 0,
            hero_max_battle: 442,
            price: 5400
        },
        {
            id: 4,
            hero_img: 'hero_1.png',
            hero_rarity: 'legendary',
            hero_title: 'THE BABY',
            hero_name: 'CULIEN',
            hero_battle: 0,
            hero_max_battle: 442,
            price: 5400
        },
    ]);
    const [totalRows, setTotalRows] = useState(300);
    const [filterRemainBattle] = useState({
        sliderWidth: 0,
        offsetSliderWidth: 0,
        min: 0,
        max: 100,
        minValueBetween: 10,
        currentMin: 0,
        inputMin: 0,
        currentMax: 100,
        inputMax: 100
    });
    const [filterBattle] = useState({
        sliderWidth: 0,
        offsetSliderWidth: 0,
        min: 0,
        max: 1000,
        minValueBetween: 200,
        currentMin: 0,
        inputMin: 0,
        currentMax: 1000,
        inputMax: 1000
    });
    const [filterLevel] = useState({
        sliderWidth: 0,
        offsetSliderWidth: 0,
        min: 0,
        max: 10,
        minValueBetween: 1,
        currentMin: 0,
        inputMin: 0,
        currentMax: 10,
        inputMax: 10
    });
    const [filterRemainBattleCurrentMin, setFilterRemainBattleCurrentMin] = useState(0);
    const [filterBattleCurrentMin, setFilterBattleCurrentMin] = useState(0);
    const [filterLevelCurrentMin, setFilterLevelCurrentMin] = useState(0);
    const [filterRemainBattleCurrentMax, setFilterRemainBattleCurrentMax] = useState(100);
    const [filterBattleCurrentMax, setFilterBattleCurrentMax] = useState(1000);
    const [filterLevelCurrentMax, setFilterLevelCurrentMax] = useState(10);

    const columns = [
        {
            name: t('hero'),
            selector: row => row.hero,
            sortable: false,
            cell: row => {
                return <BuyListComponent
                    purchaseDetailHandler={purchaseDetailHandler}
                    id={row.id}
                    heroImg={row.hero_img}
                    heroRarity={row.hero_rarity}
                    heroTitle={row.hero_title}
                    heroName={row.hero_name}
                    heroBattle={row.hero_battle}
                    heroMaxBattle={row.hero_max_battle}
                    heroPrice={moneyWithComma(row.price)}
                    heroCurrency={moneyWithTwoDecimal(parseFloat(env.COMMON_BOX_CURRENCY_PRICE) * row.price / 1000)}
                />
            }
        },
    ];

    function purchaseDetailHandler(id){
        window.location = env.URL_BUYHERO_PAGE + id;
    }

    const handlePageChange = page => {
        const validation = new RegExp(env.REGEX_NUMBERIC);
        if(validation.test(page)){
            const pagesNum = Math.ceil(totalRows / perPage);
            if(page > 0 && page <= pagesNum){
                setCurrentDatatablePage(page);
                // setLoading(true);
                // fetchTable(page);
            }
            else if(page > pagesNum){
                setCurrentDatatablePage(pagesNum);
                // setLoading(true);
            }
            else{
                setCurrentDatatablePage(1);
            }
        }
        else{
            setCurrentDatatablePage(1);
        }
	};

    function RightArrow(item){
        return <div className={`datatable_page_box right ${currentDatatablePage >= item.pagesNum ? 'disabled' : ""}`} onClick={() => handlePageChange((currentDatatablePage + 1))}><SvgDisplay src={IconArrowForward} width='20px' height='20px' /></div>
    }

    function LeftArrow(){
        return <div className={`datatable_page_box left ${currentDatatablePage === 1 ? 'disabled' : ""}`} onClick={() => handlePageChange((currentDatatablePage - 1))}><SvgDisplay src={IconArrowForward} width='20px' height='20px' /></div>
    }

    const CustomMaterialPagination = ({ rowCount }) => {
        const pagesNum = Math.ceil(rowCount / perPage);
        
        return (
            <div className="pagination">
                <div className='pagination_content'>
                    <LeftArrow />
                    <div className='pagination_content_block'>
                        <Form.Select value={currentDatatablePage} className="pagination_current_page_box" onChange={e => handlePageChange(Number(e.target.value))}>
                            {(() => {
                                const options = [];

                                for (let i = 1; i <= pagesNum; i++) {
                                    options.push(<option key={i} value={i}>{i}</option>);
                                }

                                return options;
                            })()}
                        </Form.Select>
                        <span className="page_name space_left">{t('of')} {pagesNum}</span>
                    </div>
                    <RightArrow pagesNum={pagesNum} />
                </div>
            </div>
        )
    };

    return <>
        <Container fluid style={{maxWidth: '1440px'}}>
            <Row>
                <Col className='purchaselist_page_container'>
                    <div className='purchaselist_filter_container'>
                        <div className='content_block'>
                            <div className='purchaselist_filter_main'>
                                <div className='title'>{t('filter')}</div>
                                <div className='action'>{t('clear_all')}</div>
                            </div>
                        </div>

                        {/* Hero list */}
                        <FilterCollapse 
                            title={t('hero')}
                            bodyContent={
                                <>
                                    <div className='hero_chosen_container'>
                                        {t('no_hero_selected')}
                                    </div>
                                    <div>
                                        <Button className='button' variant="primary" size="sm" onClick={() => {console.log(filterRemainBattleCurrentMin);console.log(filterRemainBattleCurrentMax)}}>{t('choose')}</Button>
                                    </div>
                                </>
                            }
                        />
                        
                        {/* rarity list */}
                        <FilterCollapse 
                            title={t('rarity')}
                            bodyContent={
                                <>
                                    {['common', 'epic', 'legendary'].map((type, key) => (
                                        <div key={key} className="mb-3">
                                            <Form.Check
                                                label={t(type)}
                                                name="rarity_group"
                                                type='checkbox'
                                                id={`default-checkbox-${type}`}
                                            />
                                        </div>
                                    ))}
                                </>
                            }
                        />

                        {/* Skin list */}
                        <FilterCollapse 
                            title={t('skin')}
                            bodyContent={
                                <>
                                    <div className='hero_chosen_container'>
                                        {t('no_skin_selected')}
                                    </div>
                                    <div>
                                        <Button className='button' variant="primary" size="sm">{t('choose')}</Button>
                                    </div>
                                </>
                            }
                        />

                        {/* Skin Rarity list */}
                        <FilterCollapse 
                            title={t('skin_rarity')}
                            bodyContent={
                                <>
                                    {['normal', 'rare', 'mythical'].map((type, key) => (
                                        <div key={key} className="mb-3">
                                            <Form.Check
                                                label={t(type)}
                                                name="rarity_group"
                                                type='checkbox'
                                                id={`default-checkbox-${type}`}
                                            />
                                        </div>
                                    ))}
                                </>
                            }
                        />

                        {/* Class list */}
                        <FilterCollapse 
                            title={t('class')}
                            bodyContent={
                                <>
                                    {['tankly', 'marksman', 'assassin'].map((type, key) => (
                                        <div key={key} className="mb-3">
                                            <Form.Check
                                                label={t(type)}
                                                name="rarity_group"
                                                type='checkbox'
                                                id={`default-checkbox-${type}`}
                                            />
                                        </div>
                                    ))}
                                </>
                            }
                        />

                        {/* Remaining gTHC Battles % list */}
                        <FilterCollapse 
                            title={t('remaining_battles')}
                            bodyContent={
                                <DoubleRangeSlider
                                    sliderWidth={filterRemainBattle.sliderWidth}
                                    offsetSliderWidth={filterRemainBattle.offsetSliderWidth}
                                    min={filterRemainBattle.min}
                                    max={filterRemainBattle.max}
                                    minValueBetween={filterRemainBattle.minValueBetween}
                                    currentMin={filterRemainBattle.currentMin}
                                    inputMin={filterRemainBattle.inputMin}
                                    currentMax={filterRemainBattle.currentMax}
                                    inputMax={filterRemainBattle.inputMax}
                                    setFilterCurrentMin={setFilterRemainBattleCurrentMin}
                                    setFilterCurrentMax={setFilterRemainBattleCurrentMax}
                                />
                            }
                        />

                        {/* Battle list */}
                        <FilterCollapse 
                            title={t('battle')}
                            bodyContent={
                                <DoubleRangeSlider
                                    sliderWidth={filterBattle.sliderWidth}
                                    offsetSliderWidth={filterBattle.offsetSliderWidth}
                                    min={filterBattle.min}
                                    max={filterBattle.max}
                                    minValueBetween={filterBattle.minValueBetween}
                                    currentMin={filterBattle.currentMin}
                                    inputMin={filterBattle.inputMin}
                                    currentMax={filterBattle.currentMax}
                                    inputMax={filterBattle.inputMax}
                                    setFilterCurrentMin={setFilterBattleCurrentMin}
                                    setFilterCurrentMax={setFilterBattleCurrentMax}
                                />
                            }
                        />

                        {/* Level list */}
                        <FilterCollapse 
                            title={t('level')}
                            bodyContent={
                                <DoubleRangeSlider
                                    sliderWidth={filterLevel.sliderWidth}
                                    offsetSliderWidth={filterLevel.offsetSliderWidth}
                                    min={filterLevel.min}
                                    max={filterLevel.max}
                                    minValueBetween={filterLevel.minValueBetween}
                                    currentMin={filterLevel.currentMin}
                                    inputMin={filterLevel.inputMin}
                                    currentMax={filterLevel.currentMax}
                                    inputMax={filterLevel.inputMax}
                                    setFilterCurrentMin={setFilterLevelCurrentMin}
                                    setFilterCurrentMax={setFilterLevelCurrentMax}
                                />
                            }
                        />

                        {/* Price Range list */}
                        <FilterCollapse 
                            title={`${t('price_range')} (${env.DEFAULT_ECOIN})`}
                            bodyContent={
                                <div className='price_ranger'>
                                    <div><input type='text' placeholder={t('min')} /></div>
                                    <div>&nbsp;-&nbsp;</div>
                                    <div><input type='text' placeholder={t('max')} /></div>
                                </div>
                            }
                        />

                    </div>

                    <div className='purchaselist_container'>
                        <div className='purchaselist_table'>
                            <div className='purchaselist_sort'>
                                <Form.Select aria-label="Default select">
                                    <option>Cheapest Price per Remaining gTHC battles</option>
                                    <option value="1">Latest</option>
                                    <option value="2">Cheapest Item</option>
                                    <option value="3">Most Expensive</option>
                                </Form.Select>
                            </div>
                            <DataTable
                                columns={columns}
                                data={data}
                                progressPending={loading}
                                progressComponent={<LoadingAnimation />}
                                pagination
                                paginationComponent={CustomMaterialPagination}
                                paginationTotalRows={totalRows}
                                noDataComponent={
                                    <div className="datatable_no_entries">
                                        <div className="img"><SvgDisplay src={IconEmptySearch} /></div>
                                        <div className="text">{t('no_data_entries')}</div>
                                        <div className="text">{t('search_another')}</div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </>
}