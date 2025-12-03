import React from "react";
import SectionHeader from "../components/ProfilePage/SectionHeader";
import InfoField from "../components/ProfilePage/InfoField";
import Header from "../components/Header";
import Footer from "../components/Footer";

const studentProfile = {
  meta: {
    lastUpdated: "28/10/2025 12:40:02",
    avatarUrl:
      "https://api.builder.io/api/v1/image/assets/TEMP/5cd3fd5bfb85afe958c3abdecd2c9da7b63e3c15?width=308",
  },
  personal: {
    id: "2312123",
    fullName: {
      lastMiddle: "NGUYEN TRUNG",
      first: "AN",
    },
    dob: "21/12/2005",
    gender: "Male",
  },
  contact: {
    phone: "03323253398",
    email: "trungan.nguyen@hcmut.edu.vn",
    address:
      "Dormitory Area A, Ta Quang Buu Street, Vietnam National University – Ho Chi Minh City Urban Area, Quarter 33, Linh Xuan Ward, Ho Chi Minh City.",
  },
  education: {
    major: "Computer Science",
    degree: "Undergraduate",
    status: "Third-year Student",
    teachingStatus: "--",
  },
  account: {
    bknetId: "trungan.nguyen@hcmut.edu.vn",
    creationTime: "24/08/2023",
  },
};

export default function Profile() {
  const data = studentProfile;

  return (
    <div className="min-h-screen bg-[#E8E8E8] py-6 sm:py-11 flex-row">
      <Header />
      <div className="max-w-[1340px] mx-auto mt-10 mb-10 px-4 sm:px-6 lg:px-0 lg:mx-[50px] xl:mx-auto">
        <div className="bg-white shadow-sm">
          <div className="px-4 pt-3 pb-3">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-3">
              <h1 className="text-[#030391] text-[30px] font-bold font-roboto leading-[21px]">
                Profile
              </h1>
              <p className="text-black text-base font-roboto leading-normal">
                <span className="font-semibold">Last updated:</span> {data.meta.lastUpdated}
              </p>
            </div>
            <button className="bg-[#FFAE00] text-white font-bold text-xs font-roboto px-7 py-2.5 rounded-[5px] hover:bg-[#e69d00] transition-colors">
              Edit
            </button>
          </div>

          <div className="mt-0">
            <SectionHeader title="Personal information" />
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                {/* Avatar */}
                <div className="lg:col-span-2 flex justify-center lg:justify-start">
                  <img
                    src={data.meta.avatarUrl}
                    alt="Profile Avatar"
                    className="w-full max-w-[154px] h-auto aspect-[154/205] object-cover"
                  />
                </div>

                <div className="lg:col-span-10 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
                    <InfoField label="ID" value={data.personal.id} />
                    <InfoField
                      label="Last and middle name"
                      value={data.personal.fullName.lastMiddle}
                    />
                    <InfoField label="First name" value={data.personal.fullName.first} />
                    <InfoField label="Date of birth" value={data.personal.dob} />
                  </div>
                  <div>
                    <InfoField label="Gender" value={data.personal.gender} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-0">
            <SectionHeader title="Contact information" />
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
                <InfoField label="Phone number" value={data.contact.phone} />
                <InfoField label="Student email" value={data.contact.email} />
                <div className="lg:col-span-1 sm:col-span-2">
                  <InfoField label="Address" value={data.contact.address} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-0">
            <SectionHeader title="Educational Information" />
            <div className="px-4 sm:px-6 py-6 sm:py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-6">
                <InfoField label="Major" value={data.education.major} />
                <InfoField label="Degree level" value={data.education.degree} />
                <InfoField label="Learning status" value={data.education.status} />
                <InfoField label="Teaching status" value={data.education.teachingStatus} />
              </div>
            </div>
          </div>

          <div className="mt-0">
            <SectionHeader title="Account Information" />
            <div className="px-4 sm:px-6 py-6 sm:py-8 pb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                <InfoField label="BKNET" value={data.account.bknetId} />
                <InfoField label="Creation time" value={data.account.creationTime} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
