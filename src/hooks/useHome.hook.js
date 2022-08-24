import { useState } from "react";

const useHome = () => {
  const [form1, setForm1] = useState(true);
  const [form2, setForm2] = useState(false);
  const [form3, setForm3] = useState(false);
  const [overView, setOverview] = useState(false);
  const [tranx, setTranx] = useState(false);

  const onNext1 = () => {
    setForm1(false);
    setForm2(true);
  };

  const onPrev1 = () => {
    setForm1(true);
    setForm2(false);
  };

  const onNext2 = () => {
    setOverview(false);
    setForm3(true);
  };

  const onPrev2 = () => {
    setOverview(true);
    setForm3(false);
  };

  const onNext3 = () => {
    setForm2(false);
    setOverview(true);
  };

  const onNext4 = () => {
    setOverview(false);
    setTranx(true);
  };

  const onPrev3 = () => {
    setTranx(false);
    setOverview(true);
  };

  const reset = () => {
    setForm1(true);
    setForm2(false);
    setForm3(false);
    setOverview(false);
    setTranx(false);
  };

  return {
    form1,
    form2,
    form3,
    overView,
    tranx,
    onNext1,
    onNext2,
    onNext3,
    onNext4,
    onPrev1,
    onPrev2,
    onPrev3,
    reset,
  };
};

export default useHome;
