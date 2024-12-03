"use client";

import HeroSection from "@/app/_components/pool/heroSection";
import PoolSection from "@/app/_components/pool/poolSection";
import StakeModal from "@/app/_components/pool/stakeModal";
import { LP_CONTRACT_ADDRESS } from "@/app/_libs/utils/constants/contractAddresses";
import { useEthersSigner } from "@/app/_libs/utils/ethers";
import { ethers } from "ethers";
import { useState } from "react";
import { baseSepolia } from "viem/chains";
import LPABI from "../../_libs/ABIs/LiquidityPool.json";

export default function Pool() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => {
    setShowModal(true);
  };

  return (
    <section className="px-[160px] pb-[172px]">
      <HeroSection openModal={openModal} />
      <PoolSection openModal={openModal} />
      <StakeModal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      />
    </section>
  );
}
