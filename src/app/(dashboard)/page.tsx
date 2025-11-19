"use client";

import AnalyticCard from "@/components/analytics/card";
import ClientFeedback from "@/components/analytics/client-feedback";
import RouteStatus from "@/components/analytics/route-status-card";
import LineAreaChart from "@/components/charts/line-area";
import SlideNextButton from "@/components/sliders-ui/SlideNextButton";
import SlidePrevButton from "@/components/sliders-ui/SlidePrevButton";
import { Form } from "@/components/ui/form";
import FormFieldSelect from "@/components/ui/globals/form-select-field";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  clientFeedbackData,
  managedIntersections,
  onCamerasVehicles,
  trafficRoutesData
} from "@/lib/placeholder-data";
import { DateFormSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, EffectCards, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { z } from "zod";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const chartData = [
  {
    name: "Traffic rate",
    data: [100, 300, 79, 90, 785, 64, 500, 400, 300, 600, 509, 734, 987, 567],
    color: "#28A265A1"
  }
];

const chartOptions = {
  legend: {
    show: true,
    position: "top",
    horizontalAlign: "center",
    customLegendItems: ["fasdfasdf"],
    markers: {
      width: 12,
      height: 12,
      strokeWidth: 6,
      strokeColor: "#000",
      fillColors: "#fff",
      radius: 5,
      offsetX: 12,
      offsetY: 12
    }
  },

  theme: {
    mode: "light"
  },
  chart: {
    type: "area",

    toolbar: {
      show: true
    }
  },

  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0,
      opacityTo: 1,
      stops: [0, 80, 100]
    }
  },
  dataLabels: {
    enabled: false,
    markers: {
      discrete: [],
      size: 7,
      strokeColors: ["#CCCED0", "#0000"],
      strokeWidth: 3,
      strokeOpacity: 1,
      strokeDashArray: 30,
      fillOpacity: 1,
      shape: "circle",
      width: 8,
      height: 8,
      radius: 2,
      offsetX: 20,
      offsetY: 20,
      showNullDataPoints: true,
      hover: {
        size: 2,
        sizeOffset: 6
      },
      floating: true
    }
  },
  stroke: {
    curve: "smooth"
  },

  tooltip: {
    enabled: true,
    shared: true,
    style: {
      fontSize: "12px",
      backgroundColor: "#000000"
    },
    theme: "dark",
    x: {
      format: "dd/MM/yy HH:mm"
    },
    marker: {
      show: true
    },
    items: {
      display: "flex"
    }
  },
  grid: {
    show: true
  },
  xaxis: {
    labels: {
      style: {
        colors: "#28A265",
        fontSize: "12px",
        fontWeight: "500"
      }
    },
    type: "text",
    categories: [
      "JAN",
      "FEB",
      "MAR",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUG",
      "SEP",
      "OCT",
      "NOV",
      "DEC"
    ]
  },
  yaxis: {
    show: true
  }
};

const Adminpage = () => {
  const swipingButtonRefNext = useRef<HTMLButtonElement | null>(null);
  const swipingButtonRefPrev = useRef<HTMLButtonElement | null>(null);

  const form = useForm<z.infer<typeof DateFormSchema>>({
    resolver: zodResolver(DateFormSchema)
  });

  const onSubmit = (data: z.infer<typeof DateFormSchema>) => {
    console.log(data);
  };

  return (
    <div className='w-full flex flex-col gap-8 py-2 pr-4'>
      <span className='text-base text-gray-700'>Daily report</span>
      <div className='w-full flex flex-col items-center justify-center gap-6'>
        <div className='w-full grid grid-cols-3 gap-8'>
          <AnalyticCard
            content={
              <ScrollArea className='h-40'>
                <div className='flex flex-col items-center justify-center gap-2 no-scrollbar'>
                  {onCamerasVehicles.map(({ route, numberOfCars }, idx) => {
                    return (
                      <div
                        className='w-full flex justify-between items-center rounded-md backdrop-blur-md bg-white/10 text-sm px-3 py-2'
                        key={idx}
                      >
                        <span>{route}</span>
                        <span className='rounded-full px-2 font-medium text-white bg-white/20'>
                          {numberOfCars}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            }
            title='Vehicles on road via cameras'
            extraStyles='bg-emerald-500 h-full'
          />

          <AnalyticCard
            content={
              <div className='flex flex-col items-center justify-center gap-2 max-h-40 overflow-y-scroll no-scrollbar'>
                {onCamerasVehicles.map(({ route, numberOfCars }, idx) => {
                  return (
                    <div
                      className='w-full flex justify-between items-center rounded-md backdrop-blur-md bg-white/5 text-sm'
                      key={idx}
                    >
                      <span>{route}</span>
                      <span className='rounded-full px-2 py-1 font-medium text-slate-300'>
                        {numberOfCars}
                      </span>
                    </div>
                  );
                })}
              </div>
            }
            title='Micro processors'
            extraStyles='bg-blue-custom h-full'
          />
          <AnalyticCard
            content={
              <div className='flex items-center justify-center gap-2 relative'>
                <div className='w-[45%] flex flex-col items-center justify-center text-center gap-2'>
                  <span className='text-7xl'>54</span>
                  <span className='text-xs'>Managed intersections</span>
                </div>
                <ScrollArea className='h-[9rem] w-[55%]'>
                  <div className='h-full flex flex-col justify-center gap-2'>
                    {managedIntersections.map(
                      ({ location, numberOfIntersections }, idx) => {
                        return (
                          <div
                            className='w-full flex items-center justify-between gap-2 pr-4 text-xs'
                            key={idx}
                          >
                            <span className='font-bold'>{location}</span>
                            <span className='font-medium bg-white/25 p-1 rounded-md'>
                              {numberOfIntersections}
                            </span>
                          </div>
                        );
                      }
                    )}
                  </div>
                </ScrollArea>
              </div>
            }
            title='Intersections'
            extraStyles='bg-violet-600'
          />
        </div>
        <div className='w-full grid place-items-center'>
          <Swiper
            modules={[Autoplay]}
            slidesPerView={5}
            className='h-full w-full !p-2'
            spaceBetween={10}
            autoplay={true}
            loop
          >
            <SlidePrevButton swipingButtonRefPrev={swipingButtonRefPrev} />
            {trafficRoutesData.map((data, idx) => {
              return (
                <SwiperSlide className='h-full !w-[20%]' key={idx}>
                  <RouteStatus {...data} key={idx} />
                </SwiperSlide>
              );
            })}
            <SlideNextButton swipingButtonRefNext={swipingButtonRefNext} />
          </Swiper>
        </div>
        <div className='w-full flex justify-between'>
          <div className='w-[65%] flex flex-col items-start justify-center gap-4'>
            <div className='w-full flex items-center justify-between'>
              <span className='text-lg font-medium'>Activities</span>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-fit'>
                  <FormFieldSelect
                    wrapperStyles=''
                    name='timeInterval'
                    control={form.control}
                    inputStyles='text-xs'
                    placeholder='Year'
                    options={["Year", "Month", "week", "Day"]}
                  />
                </form>
              </Form>
            </div>
            <div className='w-full h-[50vh]'>
              <LineAreaChart
                chartOptions={chartOptions}
                chartData={chartData}
              />
            </div>
          </div>
          <div className='w-[33%] h-full'>
            <AnalyticCard
              content={
                <div className='w-[90%] h-full grid place-items-center relative'>
                  <BsChevronCompactLeft
                    className='absolute -left-10 top-[40%] justify-self-start text-5xl z-[199] text-gray-500 font-black py-2 cursor-pointer'
                    onClick={() => swipingButtonRefPrev.current?.click()}
                  />
                  <Swiper
                    modules={[Autoplay, EffectCards, Pagination]}
                    slidesPerView={1}
                    className='h-full w-full !p-0'
                    spaceBetween={10}
                    autoplay={true}
                    pagination={{ clickable: true }}
                    loop
                    effect='cards'
                    cardsEffect={{ slideShadows: false, perSlideOffset: 30 }}
                  >
                    <SlidePrevButton
                      swipingButtonRefPrev={swipingButtonRefPrev}
                    />
                    {clientFeedbackData.map((data, idx) => {
                      return (
                        <SwiperSlide className='h-full w-full' key={idx}>
                          <ClientFeedback {...data} key={idx} />
                        </SwiperSlide>
                      );
                    })}
                    <SlideNextButton
                      swipingButtonRefNext={swipingButtonRefNext}
                    />
                  </Swiper>
                  <BsChevronCompactRight
                    className='absolute -right-10 top-[41%] justify-self-end text-5xl z-[199] text-gray-500 font-black py-2 cursor-pointer'
                    onClick={() => swipingButtonRefNext.current?.click()}
                  />
                </div>
              }
              title="Clients' feedback"
              extraStyles='bg-emerald-500/20 h-full text-gray-800 font-medium gap-8'
              titleStyles='text-base'
              contentStyles='justify- items-center'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Adminpage;
