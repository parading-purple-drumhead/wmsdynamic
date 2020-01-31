#include "mgos.h"

#include "mgos_mqtt.h"

#include "mgos_gpio.h"

#ifdef MGOS_HAVE_WIFI
#include "mgos_wifi.h"
#endif

// The hall-effect flow sensor outputs approximately 7.5 pulses per second per

// litre/minute of flow.

static const float calibrationFactor = 7.5;

struct app_ctx {

  int sensor_pin;

  int pir_pin;

  int pir;

  volatile int pulse_count;

  int64_t old_time; /* in microseconds, provided by mgos_uptime_micros() */

  float flow_rate;

  char flow_Rate [100];

  char total_litres [100];

  //char building[100];

  char tap_id[100];

  float tap_no;

  float flow_milli_liters;

  float total_milli_liters;

};



static void sensor_timer_cb(void *arg) {

  struct app_ctx *ctx = (struct app_ctx *) arg;

  /* sanity check */

  if (NULL == ctx) {

    return;

  }

  /* disable the interrupt */

  mgos_gpio_disable_int(ctx->sensor_pin);



  int64_t now = mgos_uptime_micros();

  ctx->flow_rate = ((1000000.0 / (now - ctx->old_time)) * ctx->pulse_count) /

                   calibrationFactor;

  ctx->flow_milli_liters = (ctx->flow_rate / 60) * 1000;

  ctx->total_milli_liters += ctx->flow_milli_liters;

  ctx->old_time = now;

  ctx->pulse_count = 0;

  ctx->tap_no = 1.0;

  gcvt(ctx->flow_rate, 3, ctx->flow_Rate);
  gcvt(ctx->total_milli_liters / 1000, 2, ctx->total_litres);
  gcvt(ctx->tap_no, 1, ctx->tap_id);
  ctx->pir = mgos_gpio_read(ctx->pir_pin);
  //ctx->building = "UB";




  LOG(LL_INFO, ("Flow rate: %.2f\tOutput Liquid Quantity: %.2f mL\t%.2f L",

                ctx->flow_rate, ctx->total_milli_liters,

                ctx->total_milli_liters / 1000));
// char c[100];
// struct json_out out=JSON_OUT_BUFF(c,100);
// json_printf(&out, "{%Q: %lf}", "flow", ctx->flow_rate);
        
mgos_mqtt_pubf("my/lambda/topic", 0, false,
                    "{Tap_id: \"%s\", flow: \"%s\", Total: \"%s\",Floor: \"%s\", Building: \"%s\"}", ctx->tap_id, ctx->flow_Rate, ctx->total_litres,"1", "UB");
  /*

   * enable the interrupt

   */

  mgos_gpio_enable_int(ctx->sensor_pin);

}



IRAM static void interrupt_handler(int pin, void *arg) {

  struct app_ctx *ctx = (struct app_ctx *) arg;

  /* sanity check */

  if (NULL == ctx) {

    return;

  }

  ctx->pulse_count++;



  (void) pin;

}


enum mgos_app_init_result mgos_app_init(void) {

  /*

   * sensor_pin should be defined in mos.yml or at runtime using eg.

   * mos config-set sensor.pin=0
   
   * 

   */


  int sensor_pin = mgos_sys_config_get_sensor_pin();

  int pir_pin = mgos_sys_config_get_pir_pin();


  if (-1 != sensor_pin)
   {

    struct app_ctx *ctx = (struct app_ctx *) calloc(1, sizeof(*ctx));

    ctx->sensor_pin = sensor_pin;

    ctx->pir_pin = pir_pin;

    /*

     * set the interrupt handler

     */

    mgos_gpio_set_int_handler(sensor_pin, MGOS_GPIO_INT_EDGE_NEG,

                              interrupt_handler, ctx);

    /*

     * enable the interrupt

     */

    mgos_gpio_enable_int(sensor_pin);

    /*

     * initialize old_time

     */

    ctx->old_time = mgos_uptime_micros();

    /*

     * start a 1 second timer

     */

    mgos_set_timer(1000 /* ms */, MGOS_TIMER_REPEAT, sensor_timer_cb, ctx);

  }
  

  return MGOS_APP_INIT_SUCCESS;


}