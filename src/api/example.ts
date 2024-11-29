import { instance, multiPartInstance } from "@/apis/instance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { alert } from "@/utils/alert";
import { ResponseDataType, isAxiosError } from "@/types/axiosError";
import { multiCreateResponseType } from "@/types/multi";

interface UploadRequest {
  title: string;
  mainOption: string;
  subOption: string;
  files: {
    memberFile?: File | null;
    questionAttributeFile?: File | null;
    dataFile?: File | null;
    targetFile?: File | null;
  };
}

interface GroupRequest {
  title: string;
  mainOption: string;
  subOption: string;
  msid: number;
  sid_list: number[];
}

// 다면평가 분석 프로젝트 생성 (파일 데이터 업로드)
const createMultiModelByFile = async (payload: UploadRequest) => {
  console.log(payload);
  const formData = new FormData();
  formData.append("title", payload.title);
  formData.append("mainOption", "multifaceted");
  formData.append("subOption", "files");

  if (payload.files.questionAttributeFile) {
    formData.append(
      "questionAttributeFile",
      payload.files.questionAttributeFile
    );
  }
  if (payload.files.dataFile) {
    formData.append("dataFile", payload.files.dataFile);
  }

  if (payload.files.memberFile) {
    formData.append("memberFile", payload.files.memberFile);
  }

  if (payload.files.targetFile) {
    formData.append("targetFile", payload.files.targetFile);
  }
  try {
    const { data } = await multiPartInstance.post(
      "/analysis/api/v1/specific/projects/multifaceted",
      formData
    );
    return data.data;
  } catch (error) {
    if (isAxiosError<ResponseDataType>(error)) {
      alert(`${error.response?.data.msg}`, "warning");
    }
  }
};
const useCreateMultiModelByFile = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (payload: UploadRequest) => {
      const data = await createMultiModelByFile(payload);
      return data;
    },
    onSuccess(data: multiCreateResponseType) {
      navigate(`/model/multi/${data.multifaceted_id}`);
    },
    onError(error) {
      console.error(error);
    },
  });
};
// 다면평가 분석 프로젝트 생성 (설문 그룹)
const createMultiModelByGroup = async (payload: GroupRequest) => {
  try {
    const { data } = await instance.post(
      `/analysis/api/v1/specific/projects/multifaceted/${payload.msid}`,
      payload
    );
    return data.data;
  } catch (error) {
    if (isAxiosError<ResponseDataType>(error)) {
      alert(`${error.response?.data.msg}`, "warning");
    }
  }
};

const useCreateMultiModelByGroup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (payload: GroupRequest) => {
      const data = await createMultiModelByGroup(payload);
      return data;
    },
    onSuccess(data: multiCreateResponseType) {
      navigate(`/model/multi/${data.multifaceted_id}`);
    },
    onError(error) {
      console.error(error);
    },
  });
};

export { useCreateMultiModelByFile, useCreateMultiModelByGroup };
