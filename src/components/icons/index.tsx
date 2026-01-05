interface IconProps {
  className?: string;
  defaultBg?: boolean;
}

export function IconAccount({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11a4 4 0 100-8 4 4 0 000 8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronLeft({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 18l-6-6 6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconChevronRight({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 18l6-6-6-6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCircularDollar({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconClose({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18 6L6 18M6 6l12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCustomerService({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 10h1a2 2 0 012 2v1a2 2 0 01-2 2h-1a2 2 0 01-2-2v-1a2 2 0 012-2zM8 10H7a2 2 0 00-2 2v1a2 2 0 002 2h1a2 2 0 002-2v-1a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconDice({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01M12 12h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconEyeVisibility({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconWheel({ className = "" }: IconProps) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" />
      <path
        d="M12 2v20M2 12h20M12 12l6-6M12 12l6 6M12 12l-6 6M12 12l-6-6"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}

export function IconFacebook({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`w-6 h-6 ${className}`}
    >
      <path
        fill="#3F51B5"
        d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5V37z"
      />
      <path
        fill="#FFF"
        d="M34.368,25H31v13h-5V25h-3v-4h3v-2.41c0.002-3.508,1.459-5.59,5.592-5.59H35v4h-2.287C31.104,17,31,17.6,31,18.723V21h4L34.368,25z"
      />
    </svg>
  );
}

export function IconEyeVisibilityOff({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      className={className}
    >
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
    </svg>
  );
}

export function IconFile({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      className={`w-6 h-6 ${className}`}
      fill="#FFFFFF"
    >
      <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
    </svg>
  );
}

export function IconHome({ className = "", defaultBg = false }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={defaultBg ? "#f97316" : "#ffffff"}
      className={`w-6 h-6 ${className}`}
    >
      <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
    </svg>
  );
}

export function IconLogin({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      stroke="currentColor"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M481-120v-60h299v-600H481v-60h299q24 0 42 18t18 42v600q0 24-18 42t-42 18H481Zm-55-185-43-43 102-102H120v-60h363L381-612l43-43 176 176-174 174Z" />
    </svg>
  );
}

export function IconLogout({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      stroke="currentColor"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M180-120q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h299v60H180v600h299v60H180Zm486-185-43-43 102-102H360v-60h363L621-612l43-43 176 176-174 174Z" />
    </svg>
  );
}

export function IconMoney({ className = "", defaultBg = false }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={defaultBg ? "#f97316" : "#ffffff"}
      className={`w-6 h-6 ${className}`}
    >
      <path d="M540-420q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM220-280q-24.75 0-42.375-17.625T160-340v-400q0-24.75 17.625-42.375T220-800h640q24.75 0 42.375 17.625T920-740v400q0 24.75-17.625 42.375T860-280H220Zm100-60h440q0-42 29-71t71-29v-200q-42 0-71-29t-29-71H320q0 42-29 71t-71 29v200q42 0 71 29t29 71Zm480 180H100q-24.75 0-42.375-17.625T40-220v-460h60v460h700v60ZM220-340v-400 400Z" />
    </svg>
  );
}

export function IconRecords({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      stroke="currentColor"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M477-120q-149 0-253-105.5T120-481h60q0 125 86 213t211 88q127 0 215-89t88-216q0-124-89-209.5T477-780q-68 0-127.5 31T246-667h105v60H142v-208h60v106q52-61 123.5-96T477-840q75 0 141 28t115.5 76.5Q783-687 811.5-622T840-482q0 75-28.5 141t-78 115Q684-177 618-148.5T477-120Zm128-197L451-469v-214h60v189l137 134-43 43Z" />
    </svg>
  );
}

export function IconRegister({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      stroke="currentColor"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M730-400v-130H600v-60h130v-130h60v130h130v60H790v130h-60Zm-370-81q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM40-160v-94q0-35 17.5-63.5T108-360q75-33 133.338-46.5 58.339-13.5 118.5-13.5Q420-420 478-406.5 536-393 611-360q33 15 51 43t18 63v94H40Zm60-60h520v-34q0-16-9-30.5T587-306q-71-33-120-43.5T360-360q-58 0-107.5 10.5T132-306q-15 7-23.5 21.5T100-254v34Zm260-321q39 0 64.5-25.5T450-631q0-39-25.5-64.5T360-721q-39 0-64.5 25.5T270-631q0 39 25.5 64.5T360-541Zm0-90Zm0 411Z" />
    </svg>
  );
}

export function IconSearch({ className = "", defaultBg = false }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill={defaultBg ? "#f97316" : "#ffffff"}
      className={`w-6 h-6 ${className}`}
    >
      <path d="M80-200v-80h400v80H80Zm0-200v-80h200v80H80Zm0-200v-80h200v80H80Zm744 400L670-354q-24 17-52.5 25.5T560-320q-83 0-141.5-58.5T360-520q0-83 58.5-141.5T560-720q83 0 141.5 58.5T760-520q0 29-8.5 57.5T726-410l154 154-56 56ZM560-400q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Z" />
    </svg>
  );
}

export function IconTrophy({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      stroke="currentColor"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M298-120v-60h152v-148q-54-11-96-46.5T296-463q-74-8-125-60t-51-125v-44q0-25 17.5-42.5T180-752h104v-88h392v88h104q25 0 42.5 17.5T840-692v44q0 73-51 125t-125 60q-16 53-58 88.5T510-328v148h152v60H298Zm-14-406v-166H180v44q0 45 29.5 78.5T284-526Zm196 141q57 0 96.5-40t39.5-97v-258H344v258q0 57 39.5 97t96.5 40Zm196-141q45-10 74.5-43.5T780-648v-44H676v166Zm-196-57Z" />
    </svg>
  );
}

export function IconTwitter({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`w-6 h-6 ${className}`}
    >
      <path
        fill="#03A9F4"
        d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
      />
    </svg>
  );
}

export function IconWallet({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      stroke="currentColor"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M180-233v53-600 547Zm0 113q-24.75 0-42.375-17.625T120-180v-600q0-24.75 17.625-42.375T180-840h600q24.75 0 42.375 17.625T840-780v134h-60v-134H180v600h600v-133h60v133q0 24.75-17.625 42.375T780-120H180Zm358-173q-30.525 0-52.263-21.444Q464-335.888 464-366v-227q0-30.112 21.737-51.556Q507.475-666 538-666h270q30.525 0 52.263 21.444Q882-623.112 882-593v227q0 30.112-21.737 51.556Q838.525-293 808-293H538Zm284-60v-253H524v253h298Zm-169.765-63Q679-416 697.5-434.958 716-453.917 716-481q0-26.25-19-44.625T652-544q-26 0-45 18.375T588-481q0 27.083 18.735 46.042Q625.471-416 652.235-416Z" />
    </svg>
  );
}

export function IconWhatsApp({ className = "" }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 58 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M29 57.125C44.533 57.125 57.125 44.533 57.125 29C57.125 13.467 44.533 0.875 29 0.875C13.467 0.875 0.875 13.467 0.875 29C0.875 44.533 13.467 57.125 29 57.125Z"
        fill="#4CAF50"
      />
      <path
        d="M29 13.375C20.3875 13.375 13.375 20.3875 13.375 29C13.375 32.2625 14.375 35.3875 16.2625 38.0375L16.4 38.2375L14.6375 43.4625L19.625 41.5L19.8375 41.65C22.5125 43.5875 25.675 44.6125 28.9875 44.6125C37.6 44.6125 44.6125 37.6 44.6125 28.9875C44.6125 20.375 37.6125 13.375 29 13.375ZM25.4875 24.825C25.3875 25.0875 25.075 25.4125 24.7625 25.7375C24.25 26.2625 23.675 26.85 23.7125 27.5875C23.725 27.75 23.75 28.1875 25.4625 29.95C26.5375 31.05 27.7375 32.1 28.75 32.825C30.45 34.05 31.175 34.05 31.575 33.9375C32.3 33.7375 32.675 33.1375 33 32.6125C33.3 32.125 33.5125 31.8125 33.825 31.7625C34.6 31.625 37.275 32.675 38.15 33.6C38.1875 33.65 38.2125 33.7125 38.2 33.775C38.0875 34.525 37.6625 36.3625 36.2 37.2375C35.1625 37.8625 33.775 37.8625 32.0625 37.2625C25.65 34.9875 21.3625 31.05 19.9875 26.1625C19.25 23.5375 20.05 22.0875 20.85 21.3375C21.6125 20.6125 22.5125 20.4125 22.875 20.4125C22.9375 20.4125 22.975 20.4125 23 20.425C23.2 20.5 23.8375 21.2125 24.55 22.475C25.2625 23.725 25.525 24.625 25.4875 24.825Z"
        fill="white"
      />
    </svg>
  );
}

export function IconWhatsApp2({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`w-6 h-6 ${className}`}
      clipRule="evenodd"
    >
      <path
        fill="#fff"
        d="M4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98c-0.001,0,0,0,0,0h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303z"
      />
      <path
        fill="#fff"
        d="M4.868,43.803c-0.132,0-0.26-0.052-0.355-0.148c-0.125-0.127-0.174-0.312-0.127-0.483l2.639-9.636c-1.636-2.906-2.499-6.206-2.497-9.556C4.532,13.238,13.273,4.5,24.014,4.5c5.21,0.002,10.105,2.031,13.784,5.713c3.679,3.683,5.704,8.577,5.702,13.781c-0.004,10.741-8.746,19.48-19.486,19.48c-3.189-0.001-6.344-0.788-9.144-2.277l-9.875,2.589C4.953,43.798,4.911,43.803,4.868,43.803z"
      />
      <path
        fill="#cfd8dc"
        d="M24.014,5c5.079,0.002,9.845,1.979,13.43,5.566c3.584,3.588,5.558,8.356,5.556,13.428c-0.004,10.465-8.522,18.98-18.986,18.98h-0.008c-3.177-0.001-6.3-0.798-9.073-2.311L4.868,43.303l2.694-9.835C5.9,30.59,5.026,27.324,5.027,23.979C5.032,13.514,13.548,5,24.014,5 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,42.974C24.014,42.974,24.014,42.974,24.014,42.974 M24.014,4C24.014,4,24.014,4,24.014,4C12.998,4,4.032,12.962,4.027,23.979c-0.001,3.367,0.849,6.685,2.461,9.622l-2.585,9.439c-0.094,0.345,0.002,0.713,0.254,0.967c0.19,0.192,0.447,0.297,0.711,0.297c0.085,0,0.17-0.011,0.254-0.033l9.687-2.54c2.828,1.468,5.998,2.243,9.197,2.244c11.024,0,19.99-8.963,19.995-19.98c0.002-5.339-2.075-10.359-5.848-14.135C34.378,6.083,29.357,4.002,24.014,4L24.014,4z"
      />
      <path
        fill="#40c351"
        d="M35.176,12.832c-2.98-2.982-6.941-4.625-11.157-4.626c-8.704,0-15.783,7.076-15.787,15.774c-0.001,2.981,0.833,5.883,2.413,8.396l0.376,0.597l-1.595,5.821l5.973-1.566l0.577,0.342c2.422,1.438,5.2,2.198,8.032,2.199h0.006c8.698,0,15.777-7.077,15.78-15.776C39.795,19.778,38.156,15.814,35.176,12.832z"
      />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M19.268,16.045c-0.355-0.79-0.729-0.806-1.068-0.82c-0.277-0.012-0.593-0.011-0.909-0.011c-0.316,0-0.83,0.119-1.265,0.594c-0.435,0.475-1.661,1.622-1.661,3.956c0,2.334,1.7,4.59,1.937,4.906c0.237,0.316,3.282,5.259,8.104,7.161c4.007,1.58,4.823,1.266,5.693,1.187c0.87-0.079,2.807-1.147,3.202-2.255c0.395-1.108,0.395-2.057,0.277-2.255c-0.119-0.198-0.435-0.316-0.909-0.554s-2.807-1.385-3.242-1.543c-0.435-0.158-0.751-0.237-1.068,0.238c-0.316,0.474-1.225,1.543-1.502,1.859c-0.277,0.317-0.554,0.357-1.028,0.119c-0.474-0.238-2.002-0.738-3.815-2.354c-1.41-1.257-2.362-2.81-2.639-3.285c-0.277-0.474-0.03-0.731,0.208-0.968c0.213-0.213,0.474-0.554,0.712-0.831c0.237-0.277,0.316-0.475,0.474-0.791c0.158-0.317,0.079-0.594-0.04-0.831C20.612,19.329,19.69,16.983,19.268,16.045z"
      />
    </svg>
  );
}

// ... existing code ...

export function IconInstagram({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={`w-6 h-6 ${className}`}
    >
      <path
        fill="#304ffe"
        d="M41.67,13.48c-0.4,0.26-0.97,0.5-1.21,0.77c-0.09,0.09-0.14,0.19-0.12,0.29v1.03l-0.3,1.01l-0.3,1l-0.33,1.1 l-0.68,2.25l-0.66,2.22l-0.5,1.67c0,0.26-0.01,0.52-0.03,0.77c-0.07,0.96-0.27,1.88-0.59,2.74c-0.19,0.53-0.42,1.04-0.7,1.52 c-0.1,0.19-0.22,0.38-0.34,0.56c-0.4,0.63-0.88,1.21-1.41,1.72c-0.41,0.41-0.86,0.79-1.35,1.11c0,0,0,0-0.01,0 c-0.08,0.07-0.17,0.13-0.27,0.18c-0.31,0.21-0.64,0.39-0.98,0.55c-0.23,0.12-0.46,0.22-0.7,0.31c-0.05,0.03-0.11,0.05-0.16,0.07 c-0.57,0.27-1.23,0.45-1.89,0.54c-0.04,0.01-0.07,0.01-0.11,0.02c-0.4,0.07-0.79,0.13-1.19,0.16c-0.18,0.02-0.37,0.03-0.55,0.03 l-0.71-0.04l-3.42-0.18c0-0.01-0.01,0-0.01,0l-1.72-0.09c-0.13,0-0.27,0-0.4-0.01c-0.54-0.02-1.06-0.08-1.58-0.19 c-0.01,0-0.01,0-0.01,0c-0.95-0.18-1.86-0.5-2.71-0.93c-0.47-0.24-0.93-0.51-1.36-0.82c-0.18-0.13-0.35-0.27-0.52-0.42 c-0.48-0.4-0.91-0.83-1.31-1.27c-0.06-0.06-0.11-0.12-0.16-0.18c-0.06-0.06-0.12-0.13-0.17-0.19c-0.38-0.48-0.7-0.97-0.96-1.49 c-0.24-0.46-0.43-0.95-0.58-1.49c-0.06-0.19-0.11-0.37-0.15-0.57c-0.01-0.01-0.02-0.03-0.02-0.05c-0.1-0.41-0.19-0.84-0.24-1.27 c-0.06-0.33-0.09-0.66-0.09-1c-0.02-0.13-0.02-0.27-0.02-0.4l1.91-2.95l1.87-2.88l0.85-1.31l0.77-1.18l0.26-0.41v-1.03 c0.02-0.23,0.03-0.47,0.02-0.69c-0.01-0.7-0.15-1.38-0.38-2.03c-0.22-0.69-0.53-1.34-0.85-1.94c-0.38-0.69-0.78-1.31-1.11-1.87 C14,7.4,13.66,6.73,13.75,6.26C14.47,6.09,15.23,6,16,6h16c4.18,0,7.78,2.6,9.27,6.26C41.43,12.65,41.57,13.06,41.67,13.48z"
      />
      <g>
        <path
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          d="M30,11H18c-3.9,0-7,3.1-7,7v12c0,3.9,3.1,7,7,7h12c3.9,0,7-3.1,7-7V18C37,14.1,33.9,11,30,11z"
        />
        <circle cx="31" cy="16" r="1" fill="#fff" />
      </g>
      <g>
        <circle
          cx="24"
          cy="24"
          r="6"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
      </g>
    </svg>
  );
}

export function IconCompany({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M200-120v-640h240v80h80v-80h240v640H200Zm80-80h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Zm160 480h80v-80h-80v80Zm0-160h80v-80h-80v80Zm0-160h80v-80h-80v80Z" />
    </svg>
  );
}

export function IconSocialMedia({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M720-120q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-480 0q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm480-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-480 0q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm480-320q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Zm-480 0q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35Z" />
    </svg>
  );
}

export function IconRefund({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M440-160q-117 0-198.5-81.5T160-440q0-117 81.5-198.5T440-720h6l-62-62 56-56 160 160-160 160-56-56 62-62h-6q-83 0-141.5 58.5T240-440q0 83 58.5 141.5T440-240q83 0 141.5-58.5T640-440h80q0 117-81.5 198.5T440-160Zm40-200v-120H360v-80h160q33 0 56.5 23.5T600-480v40h-80v-20h-40Zm160-280v-80h240v80H640Z" />
    </svg>
  );
}

export function IconPrivacy({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
}

export function IconFAQ({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q32-26 45-49t13-55q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-28 22.5-43t50.5-15q32 0 50 15.5t18 42.5q0 20-11.5 37.5T506-526q-44 39-54 59t-10 73ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
}

export function IconTerms({ className = "" }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 -960 960 960"
      fill="#ffffff"
      className={`w-6 h-6 ${className}`}
    >
      <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
    </svg>
  );
}
