import React, { useState, useRef, useEffect } from "react";
import "../style/ClassDetailPage.style.css";
import "../style/OrderPage.style.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetClassDetailQuery } from "../hooks/useGetClassDetail";
import NoData from "../components/NoData";
import Loading from "../components/Loading";
import Content from "../components/Content";
import { createOrder } from "../hooks/useOrder";

const OrderPage = () => {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [couponModalVisible, setCouponModalVisible] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const couponButtonRef = useRef(null);
  const navigate = useNavigate();

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

  const [id, setId] = useState("6676c6d1f6dbee872e0e635d");
  const { data, isLoading, isError, error } = useGetClassDetailQuery({ id });

  useEffect(() => {
    if (data && data.data) {
      const price = data.data.price || 0;
      const discountAmount = calculateDiscount(price, discount);
      setTotalPrice(price + discountAmount);
    }
  }, [data, discount]);

  if (isLoading) {
    return <Loading noBg noFixed />;
  }
  if (isError) {
    return <NoData icon>Error: {error.message}</NoData>;
  }

  const calculateDiscount = (price, discount) => {
    if (discount === 0) {
      return 0;
    }
    return -(price * discount) / 100;
  };

  const handlePaymentClick = async () => {
    try {
      const response = await createOrder({
        classId: id,
        price: totalPrice,
        payMethod: selectedPayment,
      });
      if (response.status !== 200) throw new Error(response.error);
      toast.success("결제가 완료되었습니다!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error.error);
      console.log("error", error);
    }
  };

  return (
    <Content className="classDetail">
      <div className="detailImg">
        <img src={data?.data.image[0]} alt="클래스" />
      </div>
      <h2 className="h2">{data?.data.name}</h2>

      <div>
        <h2 className="h5" style={{ fontWeight: "bold" }}>
          결제 수단
        </h2>
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

      <h2 className="h5" style={{ fontWeight: "bold" }}>
        쿠폰
      </h2>
      <div className="order-payment">
        <button
          type="button"
          className="white"
          onClick={handleCouponButtonClick}
          ref={couponButtonRef}
        >
          <span className="iconMore2">{selectedCoupon || "선택"}</span>
        </button>
      </div>

      {couponModalVisible && (
        <div
          className="coupon-modal"
          style={{
            top:
              couponButtonRef.current.getBoundingClientRect().bottom +
              window.scrollY,
            left: couponButtonRef.current.getBoundingClientRect().left,
          }}
        >
          <div
            className="coupon-item"
            onClick={() => handleCouponSelect("선택", 0)}
          >
            선택
          </div>
          <div
            className="coupon-item"
            onClick={() => handleCouponSelect("신규가입 환영쿠폰 20%", 20)}
          >
            신규가입 환영쿠폰 20%
          </div>
          <div
            className="coupon-item"
            onClick={() => handleCouponSelect("정기 회원쿠폰 10%", 10)}
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

      <div>
        <h2 className="h5" style={{ fontWeight: "bold" }}>
          결제 금액
        </h2>
        <div className="order-payment">
          <li className="receipt-item">
            <div>클래스 금액</div>
            <div>{data?.data.price}원</div>
          </li>

          <ul className="receipt-list">
            <li className="receipt-item">
              <div>쿠폰 할인</div>
              <div
                className={
                  calculateDiscount(data?.data.price, discount) !== 0
                    ? "red-text"
                    : ""
                }
              >
                {calculateDiscount(data?.data.price, discount)}원
              </div>
            </li>
          </ul>
          <h2 className="h6" style={{ fontWeight: "bold" }}>
            <li className="receipt-item">
              <span>최종 결제금액</span>
              <span>
                {data?.data.price +
                  calculateDiscount(data?.data.price, discount)}
                원{" "}
              </span>
            </li>
          </h2>
        </div>
        <h2 className="h6" style={{ fontWeight: "bold" }}>
          아래 내용을 확인하였으며, 결제 및 정보 제공에 동의합니다.
        </h2>
        <div className="consent-text">
          <p className="subText2">개인정보 수집 이용 및 제 3자 제공(필수)</p>
          <button className="view-button">보기</button>
        </div>
        <div className="consent-text">
          <p className="subText2">환불 규정 동의(필수)</p>
          <button className="view-button">보기</button>
        </div>
      </div>
      <div className="btnArea">
        <button type="submit" onClick={handlePaymentClick}>
          결제하기
        </button>
      </div>
    </Content>
  );
};

export default OrderPage;
