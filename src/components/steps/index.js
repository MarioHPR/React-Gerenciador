import React, { useState, useEffect } from 'react';
import { Steps } from 'antd';

const { Step } = Steps;

export default function StepsTest(props) {

  const { step, setStep } = props;

  return(
    <Steps
      type="navigation"
      current={step}
      className="site-navigation-steps"
    >
      <Step status="process" title="Dados básicos" />
      <Step status="process" title="Onde você mora?" />
      <Step status="process" title="Informe seus contatos" />
    </Steps>
  );
}