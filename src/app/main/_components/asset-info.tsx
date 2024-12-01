"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import coinsIcon from "@/images/coin.png";
import shieldIcon from "@/images/shield.png";

import { AssetInfoSkeleton } from "./skeleton";

interface AssetResponse {
  asset: string;
}

// 금액을 억, 만원 단위로 변환하는 함수
const formatKoreanCurrency = (amount: number) => {
  const eok = Math.floor(amount / 100000000);
  const man = Math.floor((amount % 100000000) / 10000);

  if (eok > 0) {
    if (man > 0) {
      return `${eok}억 ${man}만원`;
    }
    return `${eok}억원`;
  }
  if (man > 0) {
    return `${man}만원`;
  }
  return `${amount.toLocaleString()}원`;
};

// 초기 자산 값 (1억)
const INITIAL_ASSET = 100_000_000;

export default function AssetInfo() {
  const { isAuthenticated, memberNickName, token, clearAuth, isInitialized } =
    useAuth();
  const [assetInfo, setAssetInfo] = useState<AssetResponse | null>(null);

  useEffect(() => {
    const fetchAssetInfo = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/home/sidebar/asset`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.ok) {
          const data: AssetResponse = await response.json();
          setAssetInfo(data);
        }
      } catch (error) {
        console.error("자산 정보 조회 실패:", error); // eslint-disable-line
      }
    };

    if (isAuthenticated && token) {
      fetchAssetInfo();
    }
  }, [isAuthenticated, token]);

  // 상승 또는 하락 비율 계산
  const getChangeText = () => {
    if (!assetInfo?.asset) return <>로딩중...</>;

    const currentAsset = parseInt(assetInfo.asset, 10);
    const changePercentage =
      ((currentAsset - INITIAL_ASSET) / INITIAL_ASSET) * 100;

    if (changePercentage > 0) {
      return (
        <>
          저번주 보다 <br />
          {changePercentage.toFixed(1)}% 상승했어요!
        </>
      );
    }
    if (changePercentage < 0) {
      return (
        <>
          저번주 보다 <br />
          {Math.abs(changePercentage).toFixed(1)}% 하락했어요!
        </>
      );
    }
    return <>저번주와 동일한 자산입니다!</>;
  };

  // 로그아웃 처리
  const handleLogout = async () => {
    await clearAuth();
  };

  if (!isAuthenticated) {
    return (
      <div className="relative h-308 w-300 rounded-10 bg-[#D9FFE5] p-21">
        <div className="mb-10">
          <h2 className="text-20-700">내 자산</h2>
          <p className="mt-12 text-14-600">
            로그인을 하고
            <br />내 자산을 키워봐요!
          </p>
        </div>
        <div className="absolute top-4 ml-90">
          <Image src={shieldIcon} alt="보안 아이콘" width={210} height={210} />
        </div>
        <div className="mt-110">
          <Link
            href="/login"
            className="block w-full rounded-8 bg-[#11E977] py-16 text-center text-16-700 text-white"
          >
            로그인 하기
          </Link>
          <div className="mt-16 text-center text-12-400 text-gray-600">
            <Link href="/members" className="hover:text-gray-800">
              회원 가입하기
            </Link>
            {" / "}
            <Link href="/forgot-password" className="hover:text-gray-800">
              비밀번호 찾기
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isInitialized) {
    return <AssetInfoSkeleton />;
  }

  return (
    <div className="relative h-308 w-300 rounded-10 bg-[#D9FFE5] p-21">
      <div>
        <h2 className="text-20-700">내 자산</h2>
        <div className="mt-10">
          <p className="flex-col gap-5 text-16-600">{getChangeText()}</p>
          <div className="pt-40">
            <button
              type="button"
              onClick={handleLogout}
              className="h-30 rounded-5 border-none bg-red-300 px-10 text-16-700 text-gray-600"
            >
              로그아웃
            </button>
          </div>
        </div>
      </div>
      <div className="absolute top-4 ml-100">
        <Image src={coinsIcon} alt="자산 아이콘" width={210} height={210} />
      </div>
      <div className="mt-30 flex h-105 w-264 flex-col items-center justify-center rounded-8 bg-[#11E977] p-16">
        <p className="text-14-500 text-gray-600">
          {memberNickName}님의 총 자산
        </p>
        <p className="mt-4 text-24-700">
          {assetInfo?.asset
            ? formatKoreanCurrency(parseInt(assetInfo.asset, 10))
            : "로딩중..."}
        </p>
      </div>
    </div>
  );
}
