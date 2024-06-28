import React, { useState, useRef, useEffect } from "react";
import "../style/ClassDetailPage.style.css";
import "../style/OrderPage.style.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetClassDetailQuery } from "../hooks/useGetClassDetail";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import Content from "../components/Content";
import { createOrder } from "../hooks/useOrder";
import Modal from "../components/Modal";

const OrderPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const couponButtonRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const classDetail = location.state?.classDetail;

  const [timer, setTimer] = useState(5); // 타이머를 위한 상태 추가
  const [modalVisible, setModalVisible] = useState(true);

  const handlePaymentChange = (event) => {
    setSelectedPayment(event.target.value);
  };

  const handleCouponButtonClick = () => {
    setCouponModalVisible(!couponModalVisible);
  };

  const handleCouponSelect = (coupon, discountValue) => {
    setSelectedCoupon(coupon);
    setDiscount(discountValue);
    setCouponModalVisible(false);
  };

  useEffect(() => {
    if (classDetail) {
      const price = classDetail.price || 0;
      const discountAmount = calculateDiscount(price, discount);
      setTotalPrice(price + discountAmount);
    }
  }, [classDetail, discount]);

  useEffect(() => {
    if (modalVisible) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 1) {
            clearInterval(countdown);
            handleHistoryClick();
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [modalVisible]);

  const calculateDiscount = (price, discount) => {
    if (discount === 0) {
      return 0;
    }
    return -(price * discount) / 100;
  };

  const handlePaymentClick = async () => {
    try {
      // const response = await createOrder({
      //   classId: classDetail._id,
      //   price: totalPrice,
      //   payMethod: selectedPayment,
      // });
      // if (response.status !== 200) throw new Error(response.error);
      // toast.success("결제가 완료되었습니다!");
      document.querySelector(`#modalSmallTest`).showModal();
      // setTimeout(() => {
      //   navigate("/");
      // }, 1000);
    } catch (error) {
      toast.error(error.error);
      console.log("error", error);
    }
  };

  const handleHomeClick = () => {
    setModalVisible(false);
    navigate("/");
  };

  const handleHistoryClick = () => {
    setModalVisible(false);
    navigate("/class");
  };

  if (!classDetail) {
    return <NoData />;
  }

  return (
    <Content className="classDetail orderPage">
      <h2 className="h2">결제 내용</h2>
      <div className="orderList">
        <ul>
          <li>
            <div className="detailImg">
              {/* <img src={data?.data.image[0]} alt="클래스" /> */}
              <img src={classDetail.image[0]} alt="클래스" />
            </div>
            <div className="classInfo">
              <div className="class">
                <strong className="title">{classDetail.name}</strong>
                <p className="price">
                  <span>{classDetail.price.toLocaleString()}</span>
                  <span className="unit">원</span>
                </p>
              </div>
              <div className="noticeBox">{classDetail?.notice}</div>
            </div>
          </li>
        </ul>
        <div className="payInfo">
          <div className="left">
            <div className="row">
              <h2 className="h4">결제 수단</h2>
              <div className="order-payment">
                <div className="payment-options">
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="card"
                      name="payment"
                      value="card"
                      checked={selectedPayment === "card"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="card">카드결제</label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="naverpay"
                      name="payment"
                      value="naverpay"
                      checked={selectedPayment === "naverpay"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="naverpay">
                      네이버페이
                      <img
                        src="/naverpay.png"
                        alt="네이버페이 로고"
                        style={{ width: "37px", marginLeft: "5px" }}
                      />
                    </label>
                  </div>
                  <div className="payment-option">
                    <input
                      type="radio"
                      id="kakaopay"
                      name="payment"
                      value="kakaopay"
                      checked={selectedPayment === "kakaopay"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="kakaopay">
                      카카오페이
                      <img
                        src="/kakaopay.png"
                        alt="카카오페이 로고"
                        style={{ width: "37px", marginLeft: "5px" }}
                      />
                    </label>
                  </div>

                  <div className="payment-option">
                    <input
                      type="radio"
                      id="banktransfer"
                      name="payment"
                      value="banktransfer"
                      checked={selectedPayment === "banktransfer"}
                      onChange={handlePaymentChange}
                    />
                    <label htmlFor="banktransfer">가상계좌입금</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <h2 className="h4">쿠폰</h2>
              <div className="couponSet">
                <div className="order-payment">
                  <button
                    type="button"
                    className="white"
                    onClick={handleCouponButtonClick}
                    ref={couponButtonRef}
                  >
                    <span className="iconMore2">
                      {selectedCoupon || "선택"}
                    </span>
                  </button>
                </div>

                {couponModalVisible && (
                  <div
                    className="coupon-modal"
                    // style={{
                    //   top:
                    //     couponButtonRef.current.getBoundingClientRect().bottom +
                    //     window.scrollY,
                    //   left: couponButtonRef.current.getBoundingClientRect().left,
                    // }}
                  >
                    <div
                      className="coupon-item"
                      onClick={() => handleCouponSelect("선택", 0)}
                    >
                      선택
                    </div>
                    <div
                      className="coupon-item"
                      onClick={() =>
                        handleCouponSelect("신규가입 환영쿠폰 20%", 20)
                      }
                    >
                      신규가입 환영쿠폰 20%
                    </div>
                    <div
                      className="coupon-item"
                      onClick={() =>
                        handleCouponSelect("정기 회원쿠폰 10%", 10)
                      }
                    >
                      정기 회원쿠폰 10%
                    </div>
                    <div
                      className="coupon-item"
                      onClick={() => handleCouponSelect("정기 회원쿠폰 5%", 5)}
                    >
                      정기 회원쿠폰 5%
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="right">
            <h2 className="h4">결제 금액</h2>
            <div className="order-payment">
              <ul className="receipt-list">
                <li className="receipt-item">
                  <div>클래스 금액</div>
                  {/* <div>{data?.data.price}원</div> */}
                  <div>
                    <pan className="price">
                      {classDetail.price.toLocaleString()}
                    </pan>
                    <span className="unit">원</span>
                  </div>
                </li>
                <li className="receipt-item">
                  <div>쿠폰 할인</div>
                  <div
                    className={
                      // calculateDiscount(data?.data.price, discount) !== 0
                      calculateDiscount(classDetail.price, discount) !== 0
                        ? "red-text"
                        : ""
                    }
                  >
                    {/* {calculateDiscount(data?.data.price, discount)}원 */}
                    <span className="price">
                      {calculateDiscount(
                        classDetail.price,
                        discount
                      ).toLocaleString()}
                    </span>
                    <span className="unit">원</span>
                  </div>
                </li>
              </ul>
              <h2 className="h6">
                <div className="receipt-item total">
                  <div>최종 결제금액</div>
                  <div>
                    <span className="price">
                      {(
                        classDetail.price +
                        calculateDiscount(classDetail.price, discount)
                      ).toLocaleString()}
                    </span>
                    <span className="unit">원</span>
                  </div>
                  {/* {data?.data.price +
                  calculateDiscount(data?.data.price, discount)}
                원{" "}
              </span> */}
                </div>
              </h2>
            </div>
            <div className="consentArea">
              <p>아래 내용을 확인하였으며, 결제 및 정보 제공에 동의합니다.</p>
              <div className="consent-text">
                <p className="subText2">
                  개인정보 수집 이용 및 제 3자 제공(필수)
                </p>
                <button className="view-button">보기</button>
              </div>
              <div className="consent-text">
                <p className="subText2">환불 규정 동의(필수)</p>
                <button className="view-button">보기</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="btnArea">
        <button
          type="submit"
          onClick={handlePaymentClick}
          className="paymentBtn large"
        >
          결제하기
        </button>
      </div>

      {modalVisible && (
        <Modal id="modalSmallTest" size="small">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            width="50"
            height="50"
            style={{ marginBottom: "10px" }}
          >
            <path
              fill="#d60036"
              d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"
            />
          </svg>
          <h1>결제가 완료되었습니다.</h1>
          <hr />
          <div style={{ textAlign: "left", marginLeft: "10px" }}>
            <h1 style={{ marginBottom: "5px", display: "inline-block" }}>
              클래스명 : {classDetail.name}
            </h1>
          </div>
          <div style={{ textAlign: "left", marginLeft: "10px" }}>
            <h1 style={{ display: "inline-block" }}>
              결제금액 : {totalPrice.toLocaleString()} 원
            </h1>
          </div>
          <hr />
          <p>{timer}초 후에 결제 내역으로 이동합니다.</p>
          <div className="timer-bar"></div>
          <div className="btnArea full">
            <button type="button" className="gray" onClick={handleHomeClick}>
              홈으로
            </button>
            <button type="button" onClick={handleHistoryClick}>
              결제내역
            </button>
          </div>
        </Modal>
      )}
    </Content>
  );
};

export default OrderPage;
