"use client";

import React from "react";
import Select from "react-select";
import useCountries from "../../hooks/useCountries";

// ---- 型別定義，用來描述被選到的國家值 ----
export type CountrySelectValue = {
  flag: string; // 國家旗幟 emoji
  label: string; // 顯示名稱（例如 Japan）
  latlng: number[]; // 緯度經度資料
  region: string; // 所屬區域（例如 Asia）
  value: string; // 國家代碼，如 JP
};

// ---- props 型別：外層會透過 value 與 onChange 控制 select ----
interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { getAll } = useCountries(); // 取得所有國家列表

  return (
    <div>
      <Select
        placeholder="Anywhere" // placeholder 顯示文字
        isClearable // 允許使用者清空選擇
        options={getAll()} // 選項來源（國家資料）
        value={value} // controlled value（使 UI 跟 state 同步）
        // ---- react-select 的 onChange 會回傳 unknown type，所以強制轉型 ----
        onChange={(value) => onChange(value as CountrySelectValue)}
        // ---- 自訂選項顯示方式，不只是字，也包含國旗 + 地區 ----
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="flex flex-row items-center gap-3">
            <div>{option.flag}</div>
            <div>
              {option.label},
              <span className=" text-neutral-500 ml-1 ">{option.region}</span>
            </div>
          </div>
        )}
        // ---- 替 react-select 的每個內部區塊加入 Tailwind class ----
        classNames={{
          control: () => "p-3 border", // input 外框樣式
          input: () => "text-lg", // 使用者輸入時的文字大小
          option: () => "text-lg", // 下拉選單的字型大小
        }}
        // ---- 修改 react-select 內建顏色設定 ----
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary: "black", // 選中時的邊框和文字顏色
            primary25: "#ffe4e6", // hover 時背景顏色（粉嫩色）
          },
        })}
      />
    </div>
  );
};

export default CountrySelect;
