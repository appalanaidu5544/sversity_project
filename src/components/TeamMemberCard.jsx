import React from 'react';

const TeamMemberCard = ({ name, role, title, bio }) => {
  return (
    <div className="glass-card p-8 flex flex-col h-full">
      <div className="mb-6 border-b border-[#E5E7EB] pb-6">
        <h3 className="font-bold text-2xl text-[#111827] mb-2">{name}</h3>
        <p className="text-[#4F46E5] font-bold text-sm mb-1">{role}</p>
        <p className="text-[#6B7280] text-xs uppercase tracking-wider font-semibold">{title}</p>
      </div>
      <p className="text-[#1F2937] leading-relaxed flex-1">
        {bio}
      </p>
    </div>
  );
};

export default TeamMemberCard;