import React, { useState } from 'react'

import { useActiveWeb3React } from '../../../hooks'
import Web3Connect from '../../../components/Web3Connect'
import Container from '../../../components/Container'
import { LocationMarkerIcon, DocumentTextIcon } from '@heroicons/react/outline'
import Slider from '../../../components/Slider'
import NavLink from '../../../components/NavLink'
import Lightbox from '../../../components/LightBox'
import SimpleReactLightbox from 'simple-react-lightbox'
import { getTusdAddress } from '../../../utils/addressHelper'
import { PROJECT_TUSD } from '../../../constants'
import { useReserveData } from '../../../state/reserve/hooks'
import { formatBigNumberToFixed } from '../../../utils/formatBalance'
import { useToken } from '../../../hooks/Tokens'

const elements = [
  {
    src: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
    caption: 'Lorem ipsum dolor sit amet',
    height: 'auto',
  },
  {
    src: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    caption: 'Lorem ipsum dolor sit amet',
    height: 'auto',
  },
  {
    src: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1053&q=80',
    caption: 'Lorem ipsum dolor sit amet',
    height: 'auto',
  },
  {
    src: 'https://images.unsplash.com/photo-1501183638710-841dd1904471?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    caption: 'Lorem ipsum dolor sit amet',
    height: 'auto',
  },
]

export default function Trueusd() {
  const { account, chainId } = useActiveWeb3React()
  // get reserve data info
  const [data] = useReserveData(PROJECT_TUSD[chainId])
  const undelayingAsset = useToken(getTusdAddress())
  const reserveData = data?.reserveData[0].result
  const liquidityRate = reserveData?.liquidityRate
  const availableLiquidity = reserveData?.availableLiquidity
  const totalStableDebt = reserveData?.totalStableDebt
  const reserveSize = availableLiquidity?.add(totalStableDebt)

  const maxAmount = 250000
  const [amount, setAmount] = useState(100)
  const [months, setMonths] = useState(1)
  const apr = formatBigNumberToFixed(liquidityRate || '0x00', 3, 27)

  const roi = amount * (((months + 2) * parseFloat(apr)) / 12)
  // const comission = ((((amount*0.01)/12) * (months+2)) + ((((amount*0.01)/12) * (months+2))*0.16) + (roi*0.01) + ((roi*0.01)*0.16))

  return (
    <Container id="pp1-page" className="py-20 md:py-12 lg:py-20" maxWidth="full">
      <section className="reserve">
        <div className="cover">
          <div className="bg-reserve">
            <div className="container h-full px-4 mx-auto md:mx-3">
              <div className="grid h-full grid-cols-2 gap-2 place-items-end md:grid-cols-3">
                <div className="buttom-0">
                  <div className="pb-3">
                    <span className="Subtitle">Lorem ipsum..</span>
                    <h1 className="Title">Lorem ipsum dolor sit..</h1>
                    <div className="NormalText">
                      <span className="NormalTextSpanI">Campain 1</span>
                      <span>
                        <LocationMarkerIcon width="12" />
                      </span>
                      <span className="NormalTextSpanII">Tulum </span>• By
                      <a target="_blank" href="/desarrolladores/pofi">
                        {' '}
                        Pofi
                      </a>
                    </div>
                    <SimpleReactLightbox>
                      <Lightbox elements={elements} />
                    </SimpleReactLightbox>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="jnfVXW">
        <div className="kAufvr">
          <div className="jHsIAQ">
            <div className="fwWFNh">
              <span className="fZGRWW">
                <DocumentTextIcon width="24" height="24" />
              </span>
              <a className="jaXTYb" href="/materials/pofi/offering_circular.pdf">
                Offering Circular
              </a>
            </div>
          </div>
          <div className="jHsIAQ">
            <div className="fwWFNh">
              <span className="fZGRWW">
                <DocumentTextIcon width="24" height="24" />
              </span>
              <a className="jaXTYb" href="/materials/pofi/brochure.pdf">
                Investor Brochure
              </a>
            </div>
          </div>
          <div className="jHsIAQ">
            <div className="fwWFNh">
              <span className="fZGRWW">
                <DocumentTextIcon width="24" height="24" />
              </span>
              <button className="dSVVHs" type="button">
                Contact Investor Relations
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="content-between justify-center hidden mx-5 NnZDJ sm:flex">
        <nav className="py-2.5 bg-gray-700 border-gray-200 dark:bg-gray-800">
          <NavLink href="#Overview">
            <a className="py-2.5 flex-auto px-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis lg:px-5 xl:px-8  whitespace-nowrap">
              Overview
            </a>
          </NavLink>
          <NavLink href="#Strategy">
            <a className="py-2.5 flex-auto px-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis lg:px-5 xl:px-8  whitespace-nowrap">
              Strategy
            </a>
          </NavLink>
          <NavLink href="#Performance">
            <a className="py-2.5 flex-auto px-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis lg:px-5 xl:px-8  whitespace-nowrap">
              Performance
            </a>
          </NavLink>
          <NavLink href="#Portfolio">
            <a className="py-2.5 flex-auto px-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis lg:px-5 xl:px-8  whitespace-nowrap">
              Portfolio
            </a>
          </NavLink>
          <NavLink href="#FAQS">
            <a className="py-2.5 flex-auto px-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis lg:px-5 xl:px-8  whitespace-nowrap">
              FAQS
            </a>
          </NavLink>
          <NavLink href="#Resources">
            <a className="py-2.5 flex-auto px-2 text-baseline text-primary hover:text-high-emphesis focus:text-high-emphesis lg:px-5 xl:px-8  whitespace-nowrap">
              Resources
            </a>
          </NavLink>

          {account && (
            <NavLink href={`/deposit/${getTusdAddress()}/${PROJECT_TUSD[chainId]}`}>
              <a className="flex-auto px-4 opacity-100 c-py bg-gradient-to-r from-blue to-pink text-high-emphesis focus:text-high-emphesis lg:px-5 xl:px-8 whitespace-nowrap">
                Invest
              </a>
            </NavLink>
          )}
          {!account && (
            <NavLink href={``}>
              <a className="flex-auto pr-1 opacity-100 c-py text-high-emphesis focus:text-high-emphesis lg:px-5 whitespace-nowrap">
                <Web3Connect size="sm" color="gradient" className="w-auto" />
              </a>
            </NavLink>
          )}
        </nav>
      </div>

      <div className="flex content-between justify-center mx-5 NnZDJ sm:hidden">
        <nav className="py-2.5 bg-gray-700 border-gray-200 dark:bg-gray-800">
          {account && (
            <NavLink href={`/deposit/${getTusdAddress()}/${PROJECT_TUSD[chainId]}`}>
              <a className="flex-auto px-8 opacity-100 c-py bg-gradient-to-r from-blue to-pink text-high-emphesis focus:text-high-emphesis whitespace-nowrap">
                Invest
              </a>
            </NavLink>
          )}
        </nav>
      </div>

      <div className="px-4 py-4 md:px-8 id-ref-sections" id="Overview">
        <div className="fuJzBa">
          <div className="PTitle">Overview</div>
          <div className="esEBud">
            <p className="px-5 text-justify PSubtitle">
              Since inception, the REIT has distributed between 15% and 17% annualized based on purchase price.
            </p>
            <div className="px-5 py-4 text-justify PCenter">
              MogulREIT I is a public, non-traded REIT making debt and equity investments in commercial real estate
              properties diversified by investment, geography and property type. The REIT’s primary focus is providing
              monthly income to investors by rigorously evaluating numerous investment opportunities to find those that
              can support the REIT’s distribution target.
            </div>
            <div className="dAORTk">
              <div className="fMTQqS">
                <img
                  className="iYdxMO"
                  src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fdistribution.svg"
                  alt=""
                />
                <p className="PImgColTitle">Target Amount</p>
                <p className="PImgColSubtitle">
                  {`${maxAmount.toLocaleString()} ${
                    undelayingAsset?.symbol
                  } Since inception, MogulREIT I has distributed 57 consecutive months of distributions to investors totaling approximately $15.7 million.`}
                </p>
              </div>
              <div className="duLoRX">
                <img
                  className="iYdxMO"
                  src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fdiversification.svg"
                  alt=""
                />
                <p className="PImgColTitle">Currently Deposited</p>
                <p className="PImgColSubtitle">
                  {`${formatBigNumberToFixed(reserveSize || '0x00', 2, undelayingAsset?.decimals)} ${
                    undelayingAsset?.symbol
                  } Broad selection of investments across property types and geographies designed to reduce risk.`}
                </p>
              </div>
              <div className="jGshr">
                <img
                  className="iYdxMO"
                  src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fincome.svg"
                  alt=""
                />
                <p className="PImgColTitle">Distribution</p>
                <p className="PImgColSubtitle">
                  Quarterly Cash flow from debt and equity investments in commercial real estate properties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto id-ref-sections" id="Strategy">
        <div className="justify-center flex-auto">
          <div className="PTitle">Calculator</div>
          <div className="px-5">
            <div className="pt-3">
              <p className="font-bold">1. Elige el monto a invertir</p>
            </div>
            <div>
              <div className="pb-1 text-center">
                <p className="SliderLabel">${amount.toLocaleString('en-US')}</p>
              </div>
              <Slider
                onValueChanged={(value) => setAmount(Math.ceil(value))}
                name="amount"
                value={amount}
                min={100}
                max={500000}
                step={100}
              />
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <p>$100</p>
              </div>
              <div>
                <p>$500,000</p>
              </div>
            </div>
            <div className="flex mt-4 mb-2">
              <div className="mr-2">
                <p className="font-bold">2. Plazo estimado para fines del cálculo</p>
              </div>
            </div>
            <div>
              <div className="pb-1 text-center">
                <p className="SliderLabel">{months + 2} meses</p>
              </div>
              <Slider
                onValueChanged={(value) => setMonths(Math.ceil(value))}
                name="months"
                value={months}
                min={1}
                max={26}
                step={1}
              />
            </div>
            <div className="flex justify-between mt-2">
              <div>
                <p>3 meses</p>
              </div>
              <div>
                <p>28 meses</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center id-ref-sections" id="Performance">
        <div className="p-3">
          <div className="flex justify-center mt-4">
            <table className="w-11/12 md:w-5/12">
              <tbody>
                <tr>
                  <td className="TdTextLeft">Tu inversión</td>
                  <td className="TdTextRight">
                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                </tr>
                <tr>
                  <td className="TdTextLeft">Rendimientos</td>
                  <td className="TdTextRight">
                    ${roi.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                </tr>
                <tr className="">
                  <td className="TdTextLeft">Total</td>
                  <td className="TdTextRight">
                    ${(amount + roi).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                </tr>
                <tr>
                  <td className="TdTextLeft">Impuestos*</td>
                  <td className="TdTextRight">
                    ${(roi * 0.2).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                </tr>
                {/*<tr>
                  <td className="TdTextLeft">Comisión pofi investments*</td>
                  <td className="TdTextRight">${comission.toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0})}</td>
                </tr>*/}
                <tr className="">
                  <td className="TdTextLeft">A recibir</td>
                  <td className="TdTextRight">
                    ${(roi - roi * 0.2).toLocaleString('en-Us', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-4">
            <img
              src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fearn.svg"
              width="223"
              alt="earn"
            />
          </div>
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <div className="w-9/12">
                <div className="flex-initial text-xl ">
                  Si inviertes
                  <br />
                  <span className="text-indigo-200">
                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{' '}
                  </span>
                  <br />
                  recibirás
                  <br />
                  <span className="font-semibold text-indigo-200">
                    ${roi.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}{' '}
                  </span>
                  de intereses cada
                  <br />
                  <span className="font-semibold text-indigo-200">{months + 2} meses </span>y{' '}
                  <span className="font-semibold text-indigo-200">${amount.toLocaleString('en-US')} </span>de
                  <br />
                  tu inversión al finalizar el plazo.*
                </div>
                <div className="flex-initial text-xs">
                  *Los impuestos aplican únicamente para personas físicas.
                  <br />
                  La comisión pofi investments incluye 16% de IVA.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
