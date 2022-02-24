import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import Container from '../../components/Container'
import Button from '../../components/Button'
import Head from 'next/head'
import { LocationMarkerIcon, TrendingUpIcon } from '@heroicons/react/outline'
import Image from '../../components/Image'

export default function Invest() {
  const { i18n } = useLingui()
  const router = useRouter()
  return (
    <Container id="invest-page" className="py-20 md:py-22 lg:py-22" maxWidth="full">
      <Head>
        <title>Invest | Pofi</title>
        <meta key="description" name="description" content="Invest..." />
      </Head>
      <div className="BodyWrapper">
        <div className="PageTitleWrapper">
          <h1>
            <span className="PageTitle">{i18n._(t`Open Investment Opportunities`)}</span>
          </h1>
        </div>
        <div className="container">
          <div className="upmmy">
            <div className="kfVDzu">
              <div className="dFMloS">
                <div className="SectionVCard bg-dark-800">
                  <div className="CardHeader">
                    <div className="CardIcon">
                      <Image
                        src={
                          'https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fusdt-icon.svg'
                        }
                        width={32}
                        height={32}
                        alt="usdt icon"
                      />
                    </div>
                    <div className="CardTitleSection">
                      <h3 className="CardTitle">Title</h3>
                      <div className="CardLocation">
                        <LocationMarkerIcon width="14" height="14" />
                        Lorem, ipsum dolor.
                      </div>
                    </div>
                  </div>
                  <div className="cjEsQP fTHuJT">
                    <Image
                      src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1334&q=80"
                      alt=""
                      width="100%"
                      height="100%"
                      layout="fill"
                    />
                  </div>
                  <div className="hgjGUh">
                    <p className="hlWnwG">{i18n._(t`Open for investment`)}</p>
                  </div>
                  <div className="dvdkfg">
                    <div className="evkgqp">
                      <div className="VUgHi">
                        <div className="fkJsUS">
                          <p className="iTWuKL">$150K</p>
                          <p className="dLPGoD">{i18n._(t`Minimum`)}</p>
                        </div>
                        <div className="ZLaWg">
                          <div className="gKEFyt">
                            <p className="ifjPnA">{i18n._(t`Quarterly`)}</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Distributions`)}</p>
                        </div>
                        <div className="sYJTM">
                          <div className="gKEFyt">
                            <div className="CardChartIcon">
                              <TrendingUpIcon width="24" height="24" />
                            </div>
                            <p className="iTWuKL">15.00%</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Annualized Rate`)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fbsxOy">
                      <p className="bXpmEq">
                        {i18n._(
                          t`A Real Estate Investment Trust with the objectives to pay attractive and consistent cash distributions; and to preserve, protect, increase and return your capital contribution.`
                        )}
                      </p>
                    </div>
                    <div className="cWyFIK" />
                    <div className="eBIylG">
                      <Button
                        id="add-pool-button"
                        color="gradient"
                        className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap"
                        onClick={() => router.push(`/projects/pp1`)}
                      >
                        {i18n._(t`View Details`)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dFMloS">
                <div className="SectionVCard bg-dark-800">
                  <div className="CardHeader">
                    <div className="CardIcon">
                      <Image
                        width={32}
                        height={32}
                        src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Ftusd-icon.svg"
                        alt="Tusd"
                      />
                    </div>
                    <div className="CardTitleSection">
                      <h3 className="CardTitle">Title</h3>
                      <div className="CardLocation">
                        <LocationMarkerIcon width="14" height="14" />
                        Lorem, ipsum dolor.
                      </div>
                    </div>
                  </div>
                  <div className="cjEsQP fTHuJT">
                    <a className="cgTYkN" href="/investment-opportunity/193744">
                      <Image
                        src="https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                        alt=""
                        width="100%"
                        height="100%"
                        layout="fill"
                      />
                    </a>
                  </div>
                  <div className="hgjGUh">
                    <p className="hlWnwG">{i18n._(t`Open for investment`)}</p>
                  </div>
                  <div className="dvdkfg">
                    <div className="evkgqp">
                      <div className="VUgHi">
                        <div className="fkJsUS">
                          <p className="iTWuKL">$5K</p>
                          <p className="dLPGoD">{i18n._(t`Minimum`)}</p>
                        </div>
                        <div className="ZLaWg">
                          <div className="gKEFyt">
                            <p className="ifjPnA">{i18n._(t`Monthly`)}</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Distributions`)}</p>
                        </div>
                        <div className="sYJTM">
                          <div className="gKEFyt">
                            <div className="CardChartIcon">
                              <TrendingUpIcon width="24" height="24" />
                            </div>
                            <p className="iTWuKL">6.00%</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Annualized Rate`)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fbsxOy">
                      <p className="bXpmEq">
                        {i18n._(
                          t`A Real Estate Investment Trust with the objectives to pay attractive and consistent cash distributions; and to preserve, protect, increase and return your capital contribution.`
                        )}
                      </p>
                    </div>
                    <div className="cWyFIK" />
                    <div className="eBIylG">
                      <Button
                        id="add-pool-button"
                        color="gradient"
                        className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap"
                        onClick={() => router.push(`/projects/pp2`)}
                      >
                        {i18n._(t`View Details`)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dFMloS">
                <div className="SectionVCard bg-dark-800">
                  <div className="CardHeader">
                    <div className="CardIcon">
                      <Image
                        width={32}
                        height={32}
                        src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fbusd-icon.svg"
                        alt="Busd"
                      />
                    </div>
                    <div className="CardTitleSection">
                      <h3 className="CardTitle">Title</h3>
                      <div className="CardLocation">
                        <LocationMarkerIcon width="14" height="14" />
                        Lorem, ipsum dolor.
                      </div>
                    </div>
                  </div>
                  <div className="cjEsQP fTHuJT">
                    <a className="cgTYkN" href="/investment-opportunity/193744">
                      <Image
                        src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                        alt=""
                        width="100%"
                        height="100%"
                        layout="fill"
                      />
                    </a>
                  </div>
                  <div className="hgjGUh">
                    <p className="hlWnwG">{i18n._(t`Open for investment`)}</p>
                  </div>
                  <div className="dvdkfg">
                    <div className="evkgqp">
                      <div className="VUgHi">
                        <div className="fkJsUS">
                          <p className="iTWuKL">$5K</p>
                          <p className="dLPGoD">{i18n._(t`Minimum`)}</p>
                        </div>
                        <div className="ZLaWg">
                          <div className="gKEFyt">
                            <p className="ifjPnA">{i18n._(t`Monthly`)}</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Distributions`)}</p>
                        </div>
                        <div className="sYJTM">
                          <div className="gKEFyt">
                            <div className="CardChartIcon">
                              <TrendingUpIcon width="24" height="24" />
                            </div>
                            <p className="iTWuKL">6.00%</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Annualized Rate`)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fbsxOy">
                      <p className="bXpmEq">
                        {i18n._(
                          t`A Real Estate Investment Trust with the objectives to pay attractive and consistent cash distributions; and to preserve, protect, increase and return your capital contribution.`
                        )}
                      </p>
                    </div>
                    <div className="cWyFIK" />
                    <div className="eBIylG">
                      <Button
                        id="add-pool-button"
                        color="gradient"
                        className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap"
                        onClick={() => router.push(`/theter`)}
                      >
                        {i18n._(t`View Details`)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dFMloS">
                <div className="SectionVCard bg-dark-800">
                  <div className="CardHeader">
                    <div className="CardIcon">
                      <Image
                        width={32}
                        height={32}
                        src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fdai-icon.svg"
                        alt="Dai"
                      />
                    </div>
                    <div className="CardTitleSection">
                      <h3 className="CardTitle">Title</h3>
                      <div className="CardLocation">
                        <LocationMarkerIcon width="14" height="14" />
                        Lorem, ipsum dolor.
                      </div>
                    </div>
                  </div>
                  <div className="cjEsQP fTHuJT">
                    <a className="cgTYkN" href="/investment-opportunity/193744">
                      <Image
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                        alt=""
                        width="100%"
                        height="100%"
                        layout="fill"
                      />
                    </a>
                  </div>
                  <div className="hgjGUh">
                    <p className="hlWnwG">{i18n._(t`Open for investment`)}</p>
                  </div>
                  <div className="dvdkfg">
                    <div className="evkgqp">
                      <div className="VUgHi">
                        <div className="fkJsUS">
                          <p className="iTWuKL">$5K</p>
                          <p className="dLPGoD">{i18n._(t`Minimum`)}</p>
                        </div>
                        <div className="ZLaWg">
                          <div className="gKEFyt">
                            <p className="ifjPnA">{i18n._(t`Monthly`)}</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Distributions`)}</p>
                        </div>
                        <div className="sYJTM">
                          <div className="gKEFyt">
                            <div className="CardChartIcon">
                              <TrendingUpIcon width="24" height="24" />
                            </div>
                            <p className="iTWuKL">6.00%</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Annualized Rate`)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fbsxOy">
                      <p className="bXpmEq">
                        {i18n._(
                          t`A Real Estate Investment Trust with the objectives to pay attractive and consistent cash distributions; and to preserve, protect, increase and return your capital contribution.`
                        )}
                      </p>
                    </div>
                    <div className="cWyFIK" />
                    <div className="eBIylG">
                      <Button
                        id="add-pool-button"
                        color="gradient"
                        className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap"
                        onClick={() => router.push(`/theter`)}
                      >
                        {i18n._(t`View Details`)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dFMloS">
                <div className="SectionVCard bg-dark-800">
                  <div className="CardHeader">
                    <div className="CardIcon">
                      <Image
                        width={32}
                        height={32}
                        src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fusd-coin-usdc-logo.svg"
                        alt="usdc icon"
                      />
                    </div>
                    <div className="CardTitleSection">
                      <h3 className="CardTitle">Title</h3>
                      <div className="CardLocation">
                        <LocationMarkerIcon width="14" height="14" />
                        Lorem, ipsum dolor.
                      </div>
                    </div>
                  </div>
                  <div className="cjEsQP fTHuJT">
                    <a className="cgTYkN" href="/investment-opportunity/193744">
                      <Image
                        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                        alt=""
                        width="100%"
                        height="100%"
                        layout="fill"
                      />
                    </a>
                  </div>
                  <div className="hgjGUh">
                    <p className="hlWnwG">{i18n._(t`Open for investment`)}</p>
                  </div>
                  <div className="dvdkfg">
                    <div className="evkgqp">
                      <div className="VUgHi">
                        <div className="fkJsUS">
                          <p className="iTWuKL">$5K</p>
                          <p className="dLPGoD">{i18n._(t`Minimum`)}</p>
                        </div>
                        <div className="ZLaWg">
                          <div className="gKEFyt">
                            <p className="ifjPnA">{i18n._(t`Monthly`)}</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Distributions`)}</p>
                        </div>
                        <div className="sYJTM">
                          <div className="gKEFyt">
                            <div className="CardChartIcon">
                              <TrendingUpIcon width="24" height="24" />
                            </div>
                            <p className="iTWuKL">6.00%</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Annualized Rate`)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fbsxOy">
                      <p className="bXpmEq">
                        {i18n._(
                          t`A Real Estate Investment Trust with the objectives to pay attractive and consistent cash distributions; and to preserve, protect, increase and return your capital contribution.`
                        )}
                      </p>
                    </div>
                    <div className="cWyFIK" />
                    <div className="eBIylG">
                      <Button
                        id="add-pool-button"
                        color="gradient"
                        className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap"
                        onClick={() => router.push(`/theter`)}
                      >
                        {i18n._(t`View Details`)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="dFMloS">
                <div className="SectionVCard bg-dark-800">
                  <div className="CardHeader">
                    <div className="CardIcon">
                      <Image
                        width={32}
                        height={32}
                        src="https://objectstorage.us-phoenix-1.oraclecloud.com/n/axdbiqmjmklf/b/bucket-20211203-1943/o/svg%2Fsusd.svg"
                        alt="susd icon"
                      />
                    </div>
                    <div className="CardTitleSection">
                      <h3 className="CardTitle">Title</h3>
                      <div className="CardLocation">
                        <LocationMarkerIcon width="14" height="14" />
                        Lorem, ipsum dolor.
                      </div>
                    </div>
                  </div>
                  <div className="cjEsQP fTHuJT">
                    <a className="cgTYkN" href="/investment-opportunity/193744">
                      <Image
                        src="https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80"
                        alt=""
                        width="100%"
                        height="100%"
                        layout="fill"
                      />
                    </a>
                  </div>
                  <div className="hgjGUh">
                    <p className="hlWnwG">{i18n._(t`Open for investment`)}</p>
                  </div>
                  <div className="dvdkfg">
                    <div className="evkgqp">
                      <div className="VUgHi">
                        <div className="fkJsUS">
                          <p className="iTWuKL">$5K</p>
                          <p className="dLPGoD">{i18n._(t`Minimum`)}</p>
                        </div>
                        <div className="ZLaWg">
                          <div className="gKEFyt">
                            <p className="ifjPnA">{i18n._(t`Monthly`)}</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Distributions`)}</p>
                        </div>
                        <div className="sYJTM">
                          <div className="gKEFyt">
                            <div className="CardChartIcon">
                              <TrendingUpIcon width="24" height="24" />
                            </div>
                            <p className="iTWuKL">6.00%</p>
                          </div>
                          <p className="dLPGoD">{i18n._(t`Annualized Rate`)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="fbsxOy">
                      <p className="bXpmEq">
                        {i18n._(
                          t`A Real Estate Investment Trust with the objectives to pay attractive and consistent cash distributions; and to preserve, protect, increase and return your capital contribution.`
                        )}
                      </p>
                    </div>
                    <div className="cWyFIK" />
                    <div className="eBIylG">
                      <Button
                        id="add-pool-button"
                        color="gradient"
                        className="grid items-center justify-center grid-flow-col gap-2 whitespace-nowrap"
                        onClick={() => router.push(`/theter`)}
                      >
                        {i18n._(t`View Details`)}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
