"use client";

import HeroSection from "@/app/_components/pool/heroSection";
import PoolSection from "@/app/_components/pool/poolSection";
import StakeModal from "@/app/_components/pool/stakeModal";
import { useState } from "react";

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
        onClose={() => {
          setShowModal(false);
        }}
      />
    </section>
  );
}
